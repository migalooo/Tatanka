#!/bin/bash -e
name=$1

if [ ! -n "$1" ] ;then
  echo "experiments folder name miss"
else
  if [ -d "./experiments/$1/" ]; then

    cp -rf ./config/* ./experiments/${name}/
    cp -rf ./global.scss ./experiments/${name}/src/scss/global.scss
    # mkdir ./experiments/${name}/node_modules
    # ln -s ./alfrid/src/alfrid.js ./experiments/${name}/node_modules/alfrid
    echo "copy \"./experiments/${name}\" done"

  else
    echo "experiments folder is not exist"
  fi
fi
