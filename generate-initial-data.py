import random
import uuid
import json
# Sample data categories to inspire generation
activity_categories = [
    ("animals", "farm", "nature", "crafts", "sports", "competition", "wellness", "adventure", "paranormal", "tradition", "culture", "expression", "mindfulness", "precision", "dance", "household", "water", "outdoors", "hobby"),
]
concept_categories = [
    ("sales", "business", "startup", "product", "marketing", "personal branding", "management", "leadership", "technology", "strategy", "finance", "project management", "development", "growth", "career", "innovation", "human resources", "workplace", "communication", "operations", "logistics", "design"),
]

emojis = {
    "animals": "🐾", "farm": "🚜", "nature": "🌿", "crafts": "🧶", "sports": "🏅", "competition": "🥇",
    "wellness": "💆", "adventure": "🧗", "paranormal": "🪄", "tradition": "🎎", "culture": "🗿", 
    "expression": "🎭", "mindfulness": "🧘", "precision": "📏", "dance": "🕺", "household": "🧹", 
    "water": "💧", "outdoors": "🌲", "hobby": "🎨", "sales": "📈", "business": "🏢", 
    "startup": "🚀", "product": "📦", "marketing": "📣", "personal branding": "🙋", 
    "management": "📊", "leadership": "🏆", "technology": "🖥️", "strategy": "📘", 
    "finance": "📉", "project management": "🗂️", "development": "⚙️", "growth": "🌱", 
    "career": "💼", "innovation": "💡", "human resources": "👥", "workplace": "🏠", 
    "communication": "🗨️", "operations": "🔧", "logistics": "📦", "design": "🖌️"
}

# Helper to generate a random emoji from categories
def pick_emoji(categories):
    for cat in categories:
        if cat in emojis:
            return emojis[cat]
    return "🎲"

# Generate 100 unique "X" items (activities)
x_samples = []
used_activities = set()

print("Generating X samples")
xNouns = ["beetle racing", "marathon karaoke", "speed snow shoveling", "extreme Sudoku", "ferret herding", 
                          "wallpaper design", "yarn bombing", "opera yodeling", "furniture assembly", "lava rock balancing",
                          "giant Jenga", "haiku slamming", "extreme bird calling", "garden gnome painting", "moonwalking contests",
                          "hot sauce tasting", "extreme limbo", "jigsaw puzzle marathons", "banjo speedruns", "leaf raking symphonies", 
                          "competitive snail racing", "interpretive dance", "a silent meditation retreat", "clog dancing",
                          "human-powered ice cream making", "speed reading", "speed knitting", "speed painting", "speed drawing",
                        " speed writing", "speed reading", "speed knitting", "speed painting", "speed drawing", "speed writing", "competitive hot dog eating",
                        "tetris", "bungee jumping", "my sourdough starter", "escape rooms", "DJing weddings", "camping with toddlers", "laser tag",
                        "origami crane folding", "cheese rolling down a hill", "ghost hunting","sourdough bread baking","speed golfing"]
for noun in xNouns:
    categories = random.sample(activity_categories[0], k=2)
    x_samples.append({
        "id": noun.lower().replace(" ", "-"),
        "activity": noun,
        "emoji": pick_emoji(categories),
    })
    print(len(x_samples))

# Generate 100 unique "Y" items (concepts)
y_samples = []
used_concepts = set()
with open('x-values.json', 'w') as f:
    json.dump(x_samples, f, indent=2)

yNouns = ["synergy", "go-to-market strategy", "employee engagement", "KPI alignment", "brand storytelling",
                              "product evangelism", "value prop creation", "strategic hiring", "AI enablement", "emotional intelligence",
                              "team velocity", "growth mindset", "innovation at scale", "cross-silo collaboration", "retention strategy",
                              "compliance optimization", "freemium conversion", "mobile-first design", "talent mapping", "enterprise agility", 
                              "product-market fit", "stakeholder management", "incident response", "agile workflows", 
                              "customer retention", "cross-functional collaboration",  "B2B sales", "B2B2B2B2C2C sales", "career growth trajectory"]
for noun in yNouns:
    categories = random.sample(concept_categories[0], k=2)
    y_samples.append({
        "id": noun.lower().replace(" ", "-"),
        "concept": noun,
        "emoji": pick_emoji(categories),
    })
with open('y-values.json', 'w') as f:
    json.dump(y_samples, f, indent=2)
