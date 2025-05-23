export function getCurrentHour(hourly, timezone) {
    const now = new Date();
     return hourly.findIndex(({ time }) => {
        const date = new Date(time); 
        const formatter = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          hour12: false,
          timeZone: timezone,
        });
        return formatter.format(date) === formatter.format(now);
      });
}

export function getNewHour(prevIndex, direction, hourlyLength, currentHourIndex, hoursToShow, maxScrollableHours) {
      const maxStartIndex = Math.min(hourlyLength - hoursToShow,
         currentHourIndex + maxScrollableHours - hoursToShow);
      let newIndex = prevIndex + direction * hoursToShow;
      if (newIndex < currentHourIndex) return currentHourIndex;
      if (newIndex > maxStartIndex) return maxStartIndex;
      return newIndex;
    };