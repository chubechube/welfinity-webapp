sshpass -p "wW.H277gf" ssh -tt ressic@94.23.179.229 << 'EOF'
ContainerName=$(echo wW.H277gf | sudo -S sudo -S docker ps -aq --filter ancestor=chube/wimservice:latest)
echo " Using  Contaniner -> ${ContainerName} <-"
echo wW.H277gf | sudo -S docker container exec  ${ContainerName}  ./Create_Market_From_MongoDB_Table.sh  94.23.179.229 27017  markets TR017 talendUser ba+Req6@agu6  /data/aggregate/Italy/market/  market.xlsx  Product_Dictionaries_Italy TR017 FDI_T139 /var/log/welfinity/talend/WIM/ FDI_T139 1 1
exit
'EOF'


