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
        jujutsu
        jjui
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
