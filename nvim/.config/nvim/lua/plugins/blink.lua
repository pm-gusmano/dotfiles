return {
  {
    "saghen/blink.cmp",
    opts = {
      keymap = {
        ["<CR>"] = { "fallback" }, -- always newline

        ["<Tab>"] = {
          "select_and_accept", -- accept if menu visible
          "fallback", -- otherwise indent
        },
      },
    },
  },
}
