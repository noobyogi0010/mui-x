export interface SchedulerTranslations {
  // ViewSwitcher
  agenda: string;
  day: string;
  month: string;
  other: string;
  today: string;
  week: string;

  // WeekView
  allDay: string;

  // MonthView
  hiddenEvents: (hiddenEventsCount: number) => string;
  noResourceAriaLabel: string;
  resourceAriaLabel: (resourceName: string) => string;
  weekAbbreviation: string;
  weekNumberAriaLabel: (weekNumber: number) => string;

  // EventPopover
  closeButtonAriaLabel: string;
  deleteEvent: string;
  descriptionLabel: string;
  endDateLabel: string;
  endTimeLabel: string;
  eventTitleAriaLabel: string;
  saveChanges: string;
  startDateAfterEndDateError: string;
  startDateLabel: string;
  startTimeLabel: string;
}
