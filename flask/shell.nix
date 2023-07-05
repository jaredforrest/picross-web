#{ pkgs ? import <nixpkgs> {} }:
#let
#  my-python-packages = ps: with ps; [
#  ];
#  my-python = pkgs.python3.withPackages my-python-packages;
#in my-python.env
#
{ pkgs ? import <nixpkgs> {} }:
(pkgs.buildFHSUserEnv {
  name = "pipzone";
  targetPkgs = pkgs: (with pkgs; [
    python3
    python3Packages.pip
#    pythonPackages.virtualenv
  ]);
  runScript = "bash";
}).env
