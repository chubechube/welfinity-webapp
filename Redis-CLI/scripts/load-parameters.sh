cat /org/welfinity/parameters/initialparameters.txt | redis-cli -h WelfinityWebappRedis -p 6379 -a foobared2 --pipe
exit 1