default: 
    just --list

init:
    brew install hugo
    yarn

serve:
    hugo server --disableFastRender --gc --ignoreCache

build:
    hugo