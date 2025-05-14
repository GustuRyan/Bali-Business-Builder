export default defineAppConfig({
  ui: {
    primary: "blue",
    button: {
      rounded: "rounded-md",
      default: {
        size: "lg",
        color: "gray",
      },
    },
    input: {
      rounded: "rounded-md",
      default: {
        size: "lg",
      },
    },
    textarea: {
      rounded: "rounded-md",
      default: {
        size: "lg",
      },
    },
    select: {
      rounded: "rounded-md",
      default: {
        size: "lg",
      },
    },
    card: {
      rounded: "rounded-xl",
    },
    notifications: {
      position: "top-0 right-0",
    },
    table: {
      td: {
        padding: "py-1 px-3",
      },
    },
    pagination: {
      default: {
        size: "sm",
      },
    },
    dropdown: {
      container: "z-50",
    },
  },
});
