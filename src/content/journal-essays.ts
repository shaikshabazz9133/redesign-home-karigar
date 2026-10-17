/**
 * Long-form essays for the Design Journal. An essay is laid out like any other journal article — in its
 * article's magazine layout — so it is written here as titled sections of paragraphs.
 */
import type { JournalImage } from "./journal";

export const CRAFT_IMAGES = {
  carving: {
    src: "/images/design_journal/image1.jpeg",
    alt: "A karigar's hands carving a leaf motif into a timber board, wood shavings and chisels around him",
    width: 1200,
    height: 1200,
  },
  turning: {
    src: "/images/design_journal/imag2.jpeg",
    alt: "Weathered hands guiding a chisel through turned wood, shavings piled beneath",
    width: 736,
    height: 1308,
  },
  finishing: {
    src: "/images/design_journal/image3.jpeg",
    alt: "A craftsman's hand drawing a plane along a timber surface — hand-finished surfaces",
    width: 736,
    height: 979,
  },
} satisfies Record<string, JournalImage>;

/** "Is Indian Craftsmanship Slowly Disappearing?" by Zuber Khan, in its movements, set as paragraphs. */
export const CRAFT_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "A story before the house",
    body: [
      "There was a time when a piece of furniture was never introduced into a home simply because it filled an empty corner. It carried a story long before it entered the house.",
      "A dining table was carved by artisans who understood the grain of wood as though it were a language. Doors were shaped by craftsmen who knew that every curve, every joint and every carved motif would outlive them. Brass was cast by hand. Stone was patiently chiselled. A wooden swing passed from one generation to the next, carrying not only people but memories. Nothing was hurried.",
      "The value of these objects did not lie in how quickly they could be made, but in how long they were meant to last. Perhaps that is what made them beautiful.",
    ],
  },
  {
    heading: "When speed became the measure",
    body: [
      "Today, we live in a culture where speed has quietly become the measure of success. We expect homes to be designed faster, manufactured faster and delivered faster. Furniture arrives flat-packed within days. Decorative objects are replaced as frequently as wardrobes. Trends change before the previous ones have had the chance to become familiar.",
      "Efficiency has become essential. But somewhere within this remarkable progress, we have begun to lose something far more difficult to replace. Patience. And with patience, craftsmanship.",
    ],
  },
  {
    heading: "A civilisation of makers",
    body: [
      "India has always been a civilisation of makers. Our architecture, textiles, furniture and decorative arts were never simply products. They were cultural expressions shaped by generations of knowledge. A carved wooden column was not merely structural; it reflected the region it belonged to, the artisan who shaped it and the family that would inherit it. A handwoven textile carried countless hours of labour invisible to the eye, yet deeply felt through its texture and presence.",
      "These were not objects created for immediate admiration. They were created with the expectation that they would remain within a family for decades, sometimes centuries.",
      "Today, that relationship with our homes is changing. We often seek simplicity, not because it reflects our way of living, but because it is quicker to produce, easier to consume and endlessly repeated across digital platforms.",
    ],
  },
  {
    heading: "When minimalism erases character",
    body: [
      "Minimalism itself is not the concern. When practised thoughtfully, it can be deeply calming and beautifully restrained. The concern begins when minimalism becomes an excuse to eliminate character. When every home begins to resemble the next. When handcrafted details disappear because they require more time than the market is willing to give. When machine-made perfection quietly replaces the subtle irregularities that once revealed the presence of human hands.",
      "A home should never feel anonymous. It should carry traces of the people who shaped it. A hand-carved console, an intricately woven cane panel, a block-printed textile, a bronze sculpture collected over years rather than purchased overnight—these are not decorative additions. They are reminders that craftsmanship is, above all, a conversation between time and the maker.",
    ],
  },
  {
    heading: "Designed around rituals",
    body: [
      "Perhaps this is why traditional Indian homes continue to leave such a lasting impression. They were never designed around trends. They were designed around rituals.",
      "Morning prayers in the courtyard. Family meals prepared in kitchens that remained the emotional centre of the house. Verandahs that welcomed neighbours without invitation. Furniture built not for replacement, but for inheritance. Every element possessed purpose. Every object belonged.",
    ],
  },
  {
    heading: "What will remain",
    body: [
      "As designers, we often ask ourselves a question that extends far beyond aesthetics. What will remain of the homes we create fifty years from now?",
      "Will they still carry the identity of the families who live within them? Will someone recognise the touch of an artisan in the grain of a wooden cabinet? Will a child one day inherit a piece of furniture that quietly tells the story of another generation? Or will everything have been replaced long before memory had the chance to settle into it?",
    ],
  },
  {
    heading: "Tradition and modernity, with respect",
    body: [
      "Perhaps preserving Indian craftsmanship is not about returning to the past. It is about refusing to believe that progress must come at the cost of identity. Contemporary homes can embrace modern living while still celebrating handmade artistry. Technology can improve precision without replacing human imagination. Minimal spaces can still contain soulful objects.",
      "The future of Indian interiors does not lie in choosing between tradition and modernity. It lies in allowing them to coexist with respect.",
      "At Home Karigar, we believe craftsmanship is not a decorative luxury. It is the quiet soul of a home. Because while styles will continue to evolve and trends will inevitably fade, the work of human hands carries something far more enduring. It carries memory. And perhaps that is the greatest legacy we can leave behind.",
      "— Zuber Khan, Founder & CEO, Home Karigar",
    ],
  },
  {
    heading: "A question to carry forward",
    body: [
      "As we build homes for the future, what parts of our past are we willing to leave behind—and what deserves to be carried forward?",
    ],
  },
];

/** Stand-in photographs for "Why Every Home Doesn't Need to Look Like Pinterest" until the client's arrive. */
export const PINTEREST_IMAGES = {
  cover: { src: "/images/stock/living-warm-open.jpg", alt: "A warm, open living space layered with timber, linen and collected objects", width: 2400, height: 1266 },
  rattan: { src: "/images/stock/living-cream-rattan.jpg", alt: "Cream living room with rattan and linen textures", width: 2200, height: 1611 },
  chandelier: { src: "/images/stock/bedroom-brass-chandelier.jpg", alt: "Bedroom under a brass chandelier, softened by daylight", width: 2000, height: 2000 },
  foyer: { src: "/images/stock/foyer-timber-ceiling.jpg", alt: "Foyer under a slatted timber ceiling, light falling across the floor", width: 1600, height: 2844 },
  panelled: { src: "/images/home/6.png", alt: "Panelled interior washed in warm afternoon light", width: 769, height: 1024 },
} satisfies Record<string, JournalImage>;

/**
 * The second article: three pieces read together — "Why Every Home Doesn't Need to Look Like Pinterest",
 * "Homes Designed for Generations to Come" by Zuber Khan, and "Courtyards, Verandas and What We Can
 * Learn from Traditional Homes" by Apurva Nalabale.
 */
export const PINTEREST_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Why every home doesn’t need to look like Pinterest",
    body: [
      "There is an interesting paradox unfolding within contemporary domestic design.",
      "At a time when homeowners have access to an unprecedented archive of visual inspiration, our interiors are becoming increasingly indistinguishable from one another.",
      "Never before have we possessed so many references, and yet so few genuinely individual spaces.",
      "Pinterest, perhaps more than any other platform, has transformed the way we imagine our homes. It has democratised design, allowing a homeowner in Bengaluru to discover a Belgian farmhouse, a Copenhagen apartment or a Japanese ryokan within seconds. That accessibility is remarkable. It has expanded aesthetic literacy in ways previous generations could scarcely imagine.",
      "Yet every cultural shift introduces an unintended consequence.",
      "When inspiration becomes infinitely available, discernment becomes increasingly rare.",
      "The consequence is not the repetition of a chair or a colour palette. The consequence is something far more subtle. Homes begin to inherit borrowed identities rather than cultivated ones.",
      "The domestic interior slowly ceases to function as a portrait of its inhabitants and instead becomes an accumulation of universally admired images.",
      "The distinction may appear insignificant.",
      "It is anything but.",
      "Historically, homes evolved as repositories of memory. Objects entered gradually, often through inheritance, travel, ritual or craftsmanship. Their presence was seldom justified by aesthetic compatibility alone. They existed because they carried emotional, cultural or personal significance.",
      "Contemporary interiors often reverse this chronology.",
      "Identity is expected to emerge after aesthetic composition has already been established.",
      "Perhaps this explains why so many beautifully executed homes remain strangely anonymous.",
      "They are visually coherent.",
      "Yet emotionally untranslated.",
    ],
  },
  {
    heading: "Homes designed for generations to come",
    body: [
      "A home is not built to be admired. It is built to be remembered.",
      "By Zuber Khan, Founder & CEO, Home Karigar",
      "There is a quiet moment that arrives in every well-lived home.",
      "It isn’t the day the furniture is installed. It isn’t when the final light is switched on, nor when the last piece of artwork finds its place on the wall.",
      "It arrives years later.",
      "Perhaps when a child, now grown, instinctively reaches for the same brass handle they touched every morning before school. Or when a family gathers around the dining table on another festive evening, noticing that the stone beneath their hands has softened ever so slightly with time. Or when a painting collected during a memorable journey continues to spark conversations long after the trip itself has faded into memory.",
      "These are the moments that define a home.",
      "Not the finishes.",
      "Not the furniture.",
      "Certainly not the trends.",
      "Because homes are never remembered for what they contain. They are remembered for what they allow life to become.",
      "Some spaces impress immediately. Others reveal themselves slowly. The latter are often the ones we never wish to leave.",
      "Today, we live in a culture that celebrates the new. Every season introduces another colour, another aesthetic, another algorithm telling us what beautiful should look like. Homes have become increasingly performative, designed as much for photographs as for the people who inhabit them.",
      "Yet the most extraordinary homes rarely seek attention.",
      "They possess a quiet confidence.",
      "They understand that beauty is not created through abundance, but through intention.",
      "A room does not become luxurious because it is filled with expensive objects. It becomes luxurious when every object has a reason to exist.",
      "A handwoven rug beneath your feet carries generations of craftsmanship. A bronze sculpture collected during travel speaks of curiosity rather than consumption. A piece of art inherited from a parent transforms a wall into a memory. Even a carefully chosen wallpaper does more than decorate a surface—it establishes atmosphere. It changes how morning light settles into a room, how silence feels in the afternoon, and how a space welcomes people before a single word is spoken.",
      "Design, at its finest, is never about filling a home.",
      "It is about revealing the people who live within it.",
      "The homes we remember most are never perfect. They evolve.",
      "Books slowly replace decorative objects on coffee tables. Children’s drawings find unexpected places on carefully painted walls. A favourite chair becomes worn in exactly the places where evening conversations unfold. Fresh flowers appear one week, branches collected during a walk the next.",
      "The architecture remains constant, but life quietly edits the interior.",
      "And that is perhaps the greatest achievement of thoughtful design—to create spaces generous enough to accept change without losing their identity.",
      "A home should never feel frozen in time.",
      "It should mature alongside the people who inhabit it.",
      "This is why we believe homes should be designed for generations rather than trends.",
      "Not because timelessness is fashionable, but because permanence has become increasingly rare.",
      "The materials we choose are not selected simply for their appearance, but for the stories they will one day carry. The artwork is not chosen merely to complement a palette, but to express something deeply personal. The textures, the objects, the light, the proportions—together they begin to describe a family long before introductions are made.",
      "A beautifully designed home is, in many ways, an autobiography.",
      "It speaks without language.",
      "It reveals values without explanation.",
      "It reflects identity without asking for attention.",
      "Long after visitors have forgotten the colour of the walls, they will remember how the home made them feel.",
      "That feeling cannot be purchased.",
      "It cannot be copied.",
      "It can only be designed with care.",
      "At Home Karigar, we believe our responsibility extends beyond creating beautiful interiors.",
      "We are shaping the backdrop against which life unfolds.",
      "A home will witness first steps and farewell dinners. It will host celebrations, quiet mornings, difficult conversations and ordinary Tuesdays that will one day become cherished memories.",
      "Design should honour that privilege.",
      "Because the most enduring homes are never simply built.",
      "They are lived in, loved deeply, and gently passed from one generation to the next.",
      "— Zuber Khan, Founder & CEO, Home Karigar",
    ],
  },
  {
    heading: "Courtyards, verandas and what we can learn from traditional homes",
    body: [
      "Some of the greatest lessons in design were never documented in textbooks. They were quietly embedded within the architecture of the homes we inherited.",
      "Words & editorial: Apurva Nalabale · Published by Home Karigar",
      "Architecture has always been a reflection of the society that builds it. Long before sustainability entered contemporary discourse, before wellness evolved into an industry, and before biophilic design became part of architectural vocabulary, traditional Indian homes had already internalised these principles—not as trends, but as an instinctive way of living. What we now celebrate as innovation once existed as common wisdom, shaped not by design movements but by generations of observation, climate and culture.",
      "The Indian home was never conceived as an isolated object. It was imagined as a living ecosystem where architecture, climate, ritual and community existed in quiet reciprocity. Light was never introduced merely as an aesthetic device, but as a measure of time itself. The movement of the sun choreographed the rhythm of everyday life, while shifting shadows quietly announced the passing of morning into evening. Wind was not engineered through mechanical systems but welcomed through orientation, proportion and restraint. Nature was never treated as something beyond the walls of the home; it was invited to become one of its inhabitants.",
      "Perhaps this is why traditional homes continue to feel profoundly relevant, even in an age that often defines progress through technology. Their endurance lies not in nostalgia, but in their understanding of human life. They remind us that architecture is not simply about constructing buildings. It is about shaping experiences.",
      "The courtyard, perhaps the most quietly intelligent invention within Indian domestic architecture, was never an architectural void waiting to be occupied. It was the emotional and environmental nucleus of the home—a place where daylight, rain, breeze and silence became part of everyday living. It welcomed the first monsoon before anyone else did. It carried the fragrance of wet earth into surrounding rooms. It framed the changing sky as naturally as it framed family life. Children grew up within its boundaries while grandparents watched over them from shaded verandas. Festivals unfolded beneath the open sky. Morning prayers, afternoon conversations and quiet moments of reflection all found their place there.",
      "Its value could never be measured in square feet.",
      "It existed because some experiences deserve space.",
      "The veranda possessed a similarly profound intelligence. Neither entirely private nor entirely public, it occupied a delicate threshold between intimacy and society. It dissolved the rigid boundary between the home and the street, encouraging encounters that required no invitation, conversations that demanded no occasion and moments of pause that contemporary architecture often struggles to accommodate. It allowed the home to participate in the life of its neighbourhood without surrendering its privacy.",
      "These spaces were never accidental.",
      "They reflected a civilisation that understood architecture as an extension of human behaviour rather than an arrangement of walls.",
      "Perhaps the greatest achievement of traditional Indian homes was never their ornamentation, remarkable though it was. Their true intelligence lay in understanding rhythm. Architecture acknowledged that life unfolded in cycles rather than schedules; that a meaningful home required spaces for gathering as much as solitude, celebration as much as contemplation. Every room responded not only to function, but to ritual. The architecture anticipated festivals, changing seasons, shared meals and the quiet routines that slowly become memory.",
      "Contemporary homes have become remarkably efficient. Every square metre is carefully optimised, every corner assigned a defined purpose, every layout refined for modern lifestyles. These decisions are understandable, even necessary. Cities have grown denser, lives have become faster and architecture has inevitably evolved in response.",
      "Yet efficiency has quietly altered our relationship with domestic space.",
      "In our pursuit of optimisation, we have begun to eliminate places that appear unproductive. The courtyard disappeared because it occupied valuable floor area. The veranda disappeared because it could not easily be justified within contemporary planning. Gradually, architecture surrendered moments of pause in favour of measurable efficiency.",
      "Ironically, these were often the spaces where life unfolded most naturally.",
      "This is not an argument for recreating traditional homes exactly as they once were. Architecture has always evolved, and it should continue to evolve. Every generation deserves to shape its own language of living. The question is not whether contemporary homes should imitate the past.",
      "The question is whether they still possess the wisdom that made those homes meaningful.",
      "Do our homes continue to encourage conversations that linger long after dinner has ended?",
      "Do they allow children to experience changing seasons rather than merely observe them through glass?",
      "Do they create opportunities for neighbours to become familiar faces rather than distant strangers?",
      "Or have we become so committed to efficiency that we have quietly forgotten how architecture can nurture belonging?",
      "Perhaps tradition has never been about preserving forms.",
      "Perhaps it has always been about preserving values.",
      "The intelligence of traditional Indian homes was never confined to brick, timber or stone. It lived in an understanding that architecture should respond not only to climate, but also to culture. Not only to movement, but also to memory. Not only to function, but also to the subtle rituals that transform a house into a home.",
      "Perhaps the future of Indian architecture does not depend upon recreating the forms of the past.",
      "It depends upon recovering the wisdom that shaped them.",
      "The courtyard was never merely a courtyard. The veranda was never merely a transitional space. They were architectural expressions of a civilisation that understood something we are only beginning to rediscover—that the finest homes are not those that separate us from the world, but those that quietly teach us how to belong within it.",
    ],
  },
];

/** "Why Every Kitchen We Build Starts with BWP 710 Plywood" — the client's kitchen photographs. */
export const KITCHEN_IMAGES = {
  moodboard: {
    src: "/images/design_journal/article2/img1.jpg",
    alt: "Kitchen moodboard: teal shaker cabinets, patterned tiles, quartz, brass pendants and a matte-black sink",
    width: 1254,
    height: 1254,
  },
  fridge: {
    src: "/images/design_journal/article2/img3.JPG",
    alt: "Full-height teal cabinetry around a black French-door refrigerator, with a lit open niche above the sink",
    width: 1292,
    height: 1080,
  },
  galley: {
    src: "/images/design_journal/article2/img4.JPG",
    alt: "Galley view of the teal kitchen with linear ceiling lights, tall pantry units and a built-in appliance column",
    width: 906,
    height: 1080,
  },
} satisfies Record<string, JournalImage>;

/** The kitchen article, as the client wrote it: two paragraphs, each under its own sub-heading. */
export const KITCHEN_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "The material beneath",
    body: [
      "The finest kitchens are rarely defined by what catches the eye. Stone, hardware and beautifully finished shutters may shape the first impression, but it is the material beneath them that quietly determines how the space will age. A kitchen lives through steam, humidity, changing temperatures and constant movement, making it the most demanding room in the home. That’s why every Home Karigar kitchen begins with BWP 710 Grade plywood—a material chosen not for specification sheets, but for the confidence it offers years after the home is lived in.",
    ],
  },
  {
    heading: "Designed around everyday rituals",
    body: [
      "Design, however, extends far beyond cabinetry. A well-planned pantry brings everyday essentials effortlessly within reach, bottle pull-outs transform narrow gaps into purposeful storage, and deep tandem drawers replace traditional shelves with a more intuitive way of organising cookware. Spice racks, wicker baskets and thoughtfully positioned microwave units aren’t simply accessories—they’re quiet decisions that shape how a kitchen is experienced every day. Details such as fluted glass introduce softness and texture, while precision hardware ensures every drawer and cabinet feels as refined on its thousandth use as it did on its first. Because a kitchen should never be designed around trends alone; it should be designed around the rituals of everyday living.",
    ],
  },
];

/** "Marble, Quartz & Granite: Designing the Heart of the Home" — the client's stone boards. */
export const STONE_IMAGES = {
  moodboard: {
    src: "/images/design_journal/article3/img1.jpg",
    alt: "Moodboard of marble, granite and quartz samples beside a kitchen counter, with notes on each stone",
    width: 1122,
    height: 1402,
  },
  trends: {
    src: "/images/design_journal/article3/img2.jpg",
    alt: "Luxury stone trends: Arabescato, Sahara Noir, Crema Marfil, Taj Mahal quartzite, Verde Alpi, Rosso Levanto, travertine, Patagonia and Calacatta Viola",
    width: 1122,
    height: 1402,
  },
} satisfies Record<string, JournalImage>;

/** The stone article, as the client wrote it: one paragraph to each part. */
export const STONE_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "The question in the stone gallery",
    body: [
      "Walk into any stone gallery and the experience can feel almost theatrical. Towering slabs of marble catch the light with effortless elegance. Quartz offers calm, uninterrupted surfaces that seem almost architectural in their precision. Granite, often quieter in appearance, stands with a confidence earned through decades of use. Each promises something different, yet almost every homeowner asks the same question: Which one should we choose? It is perhaps the most common conversation in every design studio, but the answer is rarely found in the stone yard. It begins in the kitchen.",
    ],
  },
  {
    heading: "Every kitchen tells a story",
    body: [
      "Every Indian kitchen tells a different story. Some wake before sunrise to the whistle of a pressure cooker and the aroma of fresh chai. Others become gathering places only on weekends, when family and friends linger around an island over slow breakfasts. There are kitchens built for elaborate festive cooking, where kadais, spice boxes and generations of family recipes take centre stage, and there are homes where simplicity, clean lines and effortless maintenance define everyday living. Before recommending marble, quartz or granite, a designer first understands these rituals, because the best material is never chosen in isolation—it is chosen for the life it will support.",
    ],
  },
  {
    heading: "Marble",
    body: [
      "Marble has remained one of architecture’s most admired materials for centuries because no engineered surface can replicate what nature creates. Every slab is unique, with veining and movement that cannot be repeated. It brings depth, softness and an unmistakable sense of permanence to a kitchen. Yet marble also asks for care. Ingredients commonly found in Indian cooking—lemon, tamarind, vinegar and richly spiced gravies—can affect its surface if left unattended. For many homeowners, however, that is part of its charm. Marble ages gracefully, collecting the quiet traces of everyday life rather than hiding them.",
    ],
  },
  {
    heading: "Quartz",
    body: [
      "Quartz reflects a more contemporary way of living. As open-plan kitchens become increasingly common, the countertop has evolved into a place for cooking, dining, working and entertaining all at once. Its non-porous surface resists stains from turmeric, coffee and everyday spills while requiring very little maintenance. For families seeking a refined aesthetic without constant upkeep, quartz offers a thoughtful balance between elegance and practicality. It is, however, best protected from direct contact with extremely hot cookware.",
    ],
  },
  {
    heading: "Granite",
    body: [
      "Granite has quietly earned its place in Indian homes through decades of dependable performance. It is particularly suited to kitchens where daily cooking is central to family life. Whether supporting a hot pressure cooker, a cast-iron kadai lifted straight from the stove or hours of festive cooking during Diwali, Ugadi or Eid, granite accommodates heat and heavy use with remarkable confidence. It may not possess the dramatic character of marble, but its resilience has made it one of the most trusted materials in Indian kitchens.",
    ],
  },
  {
    heading: "More than one material",
    body: [
      "One of the biggest misconceptions is that every luxury kitchen must commit to a single material. In reality, experienced designers often combine them. A sculptural marble island may become the visual centrepiece, quartz can provide durable preparation counters and granite may be reserved for areas closest to the cooking zone. Rather than expecting one material to perform every task, the most successful kitchens allow each surface to contribute where it performs best.",
    ],
  },
  {
    heading: "The slab and the light",
    body: [
      "The slab itself is equally important. A small sample can never reveal the character of an entire piece of stone. Designers study the full slab to understand its veining, movement and colour before deciding how it should flow across an island or waterfall edge. Light plays an equally important role. Morning sun can reveal warm undertones in marble, while evening light deepens the richness of granite and softens the uniformity of quartz. These subtle considerations are what transform a functional kitchen into one that feels timeless.",
    ],
  },
  {
    heading: "A better question",
    body: [
      "Perhaps this is why experienced designers rarely answer the question, “Which stone is best?” Instead, they ask, “How does your family use the kitchen?” A home centred around elaborate Indian cooking may naturally benefit from granite. Families seeking effortless maintenance often gravitate towards quartz. Those who appreciate the individuality of natural materials continue to choose marble, embracing its ability to evolve beautifully with time.",
    ],
  },
  {
    heading: "What remains",
    body: [
      "Years from now, cabinet finishes may change and appliances will almost certainly be replaced. The countertop, however, will remain. It will witness hurried school mornings, cups of evening chai, festive meals, birthday cakes and conversations that stretch long after dinner is over. The most memorable kitchens are never defined by whether they feature marble, quartz or granite. They are remembered for how beautifully every material supported the life that unfolded around it.",
    ],
  },
];

/** "Not Every Home Needs to Look Like Pinterest" — the client's cover and living-room material board. */
export const MOODBOARD_IMAGES = {
  cover: {
    src: "/images/design_journal/article4/img1.jpg",
    alt: "“What we can take from Pinterest and what not?” — a living room of cream sofa, olive and oxblood cushions, a walnut coffee table and a marble island beside material samples",
    width: 1672,
    height: 941,
  },
  board: {
    src: "/images/design_journal/article4/img2.jpg",
    alt: "Material and furniture board for a living room: stone-look flooring, walnut veneer, oxblood accents, an L-shaped sofa, marble coffee table and the room’s layout",
    width: 1536,
    height: 1024,
  },
  living: {
    src: "/images/design_journal/article4/card.jpg",
    alt: "Living room with a cream L-shaped sofa, an oxblood lounge chair, a black marble coffee table and lit oxblood shelving",
    width: 775,
    height: 452,
  },
} satisfies Record<string, JournalImage>;

/** The Pinterest article by Apurva Nalabale, as the client wrote it, in four parts. */
export const MOODBOARD_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "A single moment",
    body: [
      "Pinterest has become one of the most influential tools in interior design. Millions of beautifully photographed homes are only a swipe away, making it easier than ever to imagine what our own spaces could become. It has changed how homeowners collect ideas, discover materials and communicate their aspirations with designers. In many ways, it has made good design more accessible than ever before.",
      "But a Pinterest image captures only a single moment.",
    ],
  },
  {
    heading: "Where inspiration and reality diverge",
    body: [
      "It doesn’t reveal how a family cooks every evening, where children’s school bags are kept, how much storage is actually needed or how natural light changes throughout the day. It doesn’t tell you whether those open shelves collect dust, whether the white sofa survives everyday life or whether that elegant kitchen was designed for someone who rarely cooks.",
      "This is where inspiration and reality begin to diverge.",
      "The finest homes are never designed to recreate a photograph. They are designed to support the lives lived within them. Architecture, climate, routines, family size, maintenance preferences and personal habits all shape a home far more than any trend ever could.",
    ],
  },
  {
    heading: "What made you fall in love with it?",
    body: [
      "That is why we never discourage clients from bringing Pinterest references. In fact, we encourage it. Every project at Home Karigar begins with saved images spread across a table. They become the starting point of a conversation rather than the final destination. Instead of asking, “How do we copy this?” we ask, “What made you fall in love with it?”",
      "Sometimes it’s the warmth of natural wood, sometimes it’s the calmness of a muted palette, and sometimes it’s simply the feeling a space creates. Before putting pen to paper, we step into our clients’ world. We listen to their stories, understand their routines and imagine life from their perspective, because the most meaningful homes are designed with empathy before they are designed with materials.",
    ],
  },
  {
    heading: "The beginning, not the blueprint",
    body: [
      "Once we understand why a space resonates, we reinterpret those ideas to suit the architecture of the home, its surroundings and, most importantly, the people who will live within it. Inspiration becomes the beginning of the conversation—not the blueprint.",
      "Because the most memorable homes don’t remind you of a Pinterest board every time you walk through the door.",
      "They remind you of yourself.",
    ],
  },
];
