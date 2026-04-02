{
  description = "pm-gusmano's user tools";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      packages.${system} = {
        neovim = pkgs.neovim;
        nixd = pkgs.nixd;
        nixfmt = pkgs.nixfmt;

        default = pkgs.buildEnv {
          name = "pm-gusmano-tools";
          paths = [
            pkgs.neovim
            pkgs.nixd
            pkgs.nixfmt
          ];
        };
      };
    };
}
