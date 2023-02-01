import { useRuntimeConfig } from "#imports";
import type { UserType, TimeEntryType } from "clockify-ts";

const runtimeConfig = useRuntimeConfig();

type requestMethods = "get" | "post" | "put" | "patch" | "delete";

class Clockify {
  private baseUrl = "https://api.clockify.me/api/v1";
  private activeWorkspace: null | string = null;
  constructor(private apiKey: string) {}

  public request(
    endpoint: string,
    body: any = null,
    method: requestMethods = "get"
  ) {
    return fetch(this.baseUrl + endpoint, {
      method,
      headers: {
        "X-Api-Key": this.apiKey,
      },
      body: body ? JSON.stringify(body) : body,
    });
  }

  public getJson<T>(responsePromise: Promise<Response>): Promise<T> {
    return responsePromise.then((response) => response.json());
  }

  currentUser() {
    return this.getJson<UserType>(this.request(`/user`));
  }

  private async getActiveWorkspaceId() {
    if (!this.activeWorkspace) {
      const user = await this.currentUser();
      this.activeWorkspace = user.activeWorkspace;
    }

    return this.activeWorkspace;
  }

  public async timeEntries(
    workspaceId: string | null = null,
    userId: string = ""
  ) {
    const user = await this.currentUser();

    if (!workspaceId) {
      workspaceId = user.activeWorkspace;
    }

    if (!userId.length) {
      userId = user.id;
    }

    const result = await this.getJson<TimeEntryType[]>(
      this.request(`/workspaces/${workspaceId}/user/${userId}/time-entries`)
    );

    return result;
  }
}

const useClockify = () => {
  return new Clockify(runtimeConfig.clockifyApi);
};

const getResultFromIso = (duration: string, pattern: RegExp) => {
  const matches = duration.match(pattern);

  if (!matches || !matches.length) {
    return null;
  }

  return matches[matches.length - 1];
};

const getHoursFromIso = (duration: string) => {
  const match = getResultFromIso(duration, /(\d\d|\D)H/);

  if (!match) {
    return 0;
  }

  return parseInt(match);
};

const getMinutesFromIso = (duration: string) => {
  const match = getResultFromIso(duration, /(\d\d|\D)M/);

  if (!match) {
    return 0;
  }

  return parseInt(match);
};

const getSecondsFromIso = (duration: string) => {
  const match = getResultFromIso(duration, /(\d\d|\D)S/);

  if (!match) {
    return 0;
  }

  return parseInt(match);
};

const useClockifyDurationToHours = (duration: string) => {
  return (
    getHoursFromIso(duration) +
    (getMinutesFromIso(duration) + getSecondsFromIso(duration) / 60) / 60
  );
};

export { useClockify, requestMethods, useClockifyDurationToHours };
