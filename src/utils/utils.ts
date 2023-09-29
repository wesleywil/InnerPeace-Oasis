import type { MeditationData } from "./interfaces";

export function formatDate(date:Date):string{
    return date.toLocaleDateString(undefined,{
        year:'numeric',
        month:'2-digit',
        day:'2-digit'
    })
}

export   function groupDataByMonth(data: MeditationData[], year: number) {
    const months: Record<string, { days: number; percentage: number }> = {};

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    monthNames.forEach((month) => {
      months[month] = { days: 0, percentage: 0 };
    });

    data.forEach((item) => {
      const itemYear = item.end_time.getFullYear();
      if (itemYear === year) {
        const month = item.end_time.toLocaleString("default", {
          month: "short",
        });
        if (!months[month]) {
          months[month] = { days: 0, percentage: 0 };
        }

        months[month].days += 1;
      }
    });

    // Calculate the average percentage for each month
    for (const month in months) {
      if (months[month].days > 0) {
        months[month].percentage =
          (months[month].days /
            new Date(year, monthNames.indexOf(month) + 1, 0).getDate()) *
          100;
      }
    }
    return months;
  }