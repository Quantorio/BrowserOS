from flask import Flask, send_file, jsonify, request
import os
app=Flask(__name__)
debug=False
pw="admin"
dir_path = os.path.dirname(os.path.realpath(__file__))

def get_file():
    if(request.args.get("path",None)==None):return "Not found"
    if os.path.exists(os.path.join(dir_path,"filesystem",request.args.get("path",None)[1:])):return send_file(os.path.join(dir_path,"filesystem",request.args.get("path",None)[1:]))

def listingjson():
    return send_file("listing.json")

def shutdown():
    print("req shutdown")
    if request.headers.get("Authorization",None)==pw:
        try:return jsonify(True)
        finally:os._exit(0)
    return jsonify("Not authorized")

sp={
    "/listing.json.php":listingjson,
    "/fs":get_file,
    "/shutdown":shutdown
}

for i in sp.keys():
    app.route(i)(sp[i])

@app.route("/")
@app.route("/<path:path>")
def returnn(path="."):
    path=path.replace("/","\\")
    path=os.path.join(dir_path ,path)
    if(os.path.exists(path) and not os.path.isdir(path)):return send_file(path)
    elif(os.path.exists(path) and os.path.isdir(path)):return send_file(os.path.join(path,"index.html"))
    else:return ""

from   _thread import start_new_thread
import gc
def _tryStartThread(func, args=()) :
    for x in range(10) :
        try :
            gc.collect()
            start_new_thread(func, args)
            return True
        except :
            global _dns_thread_id
            try :
                _dns_thread_id += 1
            except :
                _dns_thread_id = 0
            try :
                start_new_thread('DNS_THREAD_%s' % _dns_thread_id, func, args)
                return True
            except :
                pass
    return False

def start(port,ssl=False):
	if ssl:print(f"Started {port}:",_tryStartThread(lambda:app.run(debug=debug,port=port,host="0.0.0.0",ssl_context=("server.cert","server.key"))))
	else:print(f"Started {port}:",_tryStartThread(lambda:app.run(debug=debug,port=port,host="0.0.0.0")))

if __name__=="__main__":
	start(443)
	while True:
		pass