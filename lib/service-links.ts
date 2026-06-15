export const SERVICE_LINKS = {
  fullPlanning: "/services?open=full-planning-included#full-planning",
  partialPlanning: "/services?open=partial-planning-included#partial-planning",
  eventManagement: "/services?open=event-management-included#event-management",
  featuredGallery: "/services#portfolio-gallery",
} as const;

export const HOME_SERVICE_LEARN_MORE = [
  SERVICE_LINKS.fullPlanning,
  SERVICE_LINKS.fullPlanning,
  SERVICE_LINKS.partialPlanning,
  SERVICE_LINKS.eventManagement,
] as const;
