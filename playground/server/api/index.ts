import { useClockify, useClockifyDurationToHours } from "#clockify";

export default defineEventHandler(async () => {
  const clockify = useClockify();
  const timeEntryResponse = await clockify.timeEntries();

  return {
    api: "works",
    entries: timeEntryResponse.map((entry) => {
      return {
        description: entry.description,
        hours: useClockifyDurationToHours(entry.timeInterval.duration),
      };
    }),
  };
});
