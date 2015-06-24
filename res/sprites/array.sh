#!/bin/bash

ls *.png|while read img;do img="$(echo "$img"|cut -d\. -f1)";echo "\"$img\",";done
