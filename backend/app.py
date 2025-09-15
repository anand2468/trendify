from flask import Flask, request, jsonify
from scrapper import getProducts
from flask_cors import CORS
# Enable CORS for all routes
CORS_origins = ["*"]  # You can restrict this to your frontend domain if needed

app = Flask(__name__)
CORS(app=app, resources={r"/*": {"origins": CORS_origins}})


@app.route('/', methods=['GET'])
def index():
    return "hello world"

@app.route('/getproducts')
def fetchProducts():
    product = request.args.get('product')
    if product:
        if request.args.get("outfittype") == "individual":

            return jsonify({"shirts":getProducts(product + " shirt"), "pants": getProducts(product + " pants")}), 200
        return jsonify({"shirts":getProducts(product + " full outfit")}), 200
    return jsonify({"status":400}), 400


if __name__ == '__main__':
    app.run(debug=True)