#!/bin/bash
if [ $# -ne 1 ]; then
	echo "Welfinity riseScript "
	echo "----------------------------------"
	echo "Error : Wrong number of parameters"
	echo "The script must have the following parameters : "
    echo "- stack name : [String], the stack name to be used working dir"
	echo "Example : ./deployStackScript wim-service"
	exit
fi


    STACK_NAME=$1
    echo "----> $0 <---"
    echo "STACK_NAME    =   $1"

#Build stack
rancher-compose  --url http://94.23.179.226:8080 --access-key B9A804A459E2E4B4740A --secret-key 8bNu9VZr4zepeVGSDFLR1aRs94wUSNXz74pQ8Hsx -p $1 up -d


