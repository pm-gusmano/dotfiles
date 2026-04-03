{
  description = "pm-gusmano's user tools";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };

      tools = with pkgs; [
        neovim
        nixd
        nixfmt
        eza
        git
        jujutsu
        jjui
        just
        fd
        fzf
        ripgrep
        yazi
        zellij
        rustup
        uv
        docker
        apptainer
        dep-tree
        difftastic
        ast-grep
        tree-sitter
      ];
    in {
      packages.${system} = {
        default = pkgs.buildEnv {
          name = "pm-gusmano-tools";
          paths = tools;
        };
      };
    };
}
