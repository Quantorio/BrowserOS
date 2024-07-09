from backends.srver import start

if __name__=="__main__":
	start(443,ssl=True)
	start(80)
	while True:
		pass
