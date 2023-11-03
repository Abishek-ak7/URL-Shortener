import pymongo
from flask import Flask, request, render_template, redirect
import secrets
import string

client = pymongo.MongoClient("localhost", 27017)
db = client["Ak"]
collection = db["Url"]

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def get_url():
    long_url = None
    short_url = None

    if request.method == 'POST':
        long_url = request.form.get('long_url')

        # Store the long URL in the MongoDB collection
        if long_url:
            short_url = store_url(long_url)

    return render_template('index.html', long_url=long_url, short_url=short_url)

def store_url(long_url):
    existing_url_doc = collection.find_one({"long_url": long_url})
    if existing_url_doc:
        return existing_url_doc["short_url"]

    shortcode = generate_shortcode()  # Generate a shortcode
    short_url = f"http://localhost:5000/{shortcode}"  # Create the short URL

    # Create a document to insert into the MongoDB collection
    url_doc = {
        "long_url": long_url,
        "short_url": short_url
    }

    # Insert the document into the collection
    inserted_id = collection.insert_one(url_doc).inserted_id

    return short_url  # Return the short URL to be displayed

def generate_shortcode(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

@app.route('/<shortcode>')
def redirect_to_original_url(shortcode):
    # Convert the shortcode to lowercase to make the lookup case-insensitive

    url_doc = collection.find_one({"short_url": f"http://localhost:5000/{shortcode}"})
    if url_doc:
        long_url = url_doc["long_url"]
        return redirect(long_url)
    else:
        return "Short URL not found."

if __name__ == "__main__":
    app.run(debug=True)
