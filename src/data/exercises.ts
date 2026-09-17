export interface Exercise {
  id: string;
  name: string;
  description: string;
  formNote: string;
}

const catalogue: Exercise[] = [
  // --- Core ---
  { id: "crunch", name: "Crunch", description: "Spinal flexion from lying on the back to curl the shoulders toward the pelvis.", formNote: "Curl the ribs toward the hips instead of pulling on the neck." },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", description: "Raising straight legs toward the chest while hanging from a bar.", formNote: "Tilt the pelvis back at the top — swinging means the hip flexors are doing it." },
  { id: "ab-wheel-rollout", name: "Ab Wheel Rollout", description: "Rolling the wheel forward from the knees while resisting lumbar extension.", formNote: "Keep the ribs down; stop before the lower back arches." },
  { id: "plank", name: "Plank", description: "Isometric hold in a straight-body push-up position, bracing the core.", formNote: "Squeeze the glutes and brace as if about to be punched." },
  { id: "dead-bug", name: "Dead Bug", description: "Lying opposite arm and leg extension while keeping the lower back flat.", formNote: "Press the lower back into the floor for the whole set." },
  { id: "stomach-vacuum", name: "Stomach Vacuum", description: "Drawing the navel inward and holding, training the deep abdominal wall.", formNote: "Exhale fully first, then pull the belly button toward the spine." },
  { id: "pallof-press", name: "Pallof Press", description: "Pressing a cable straight out while resisting rotation.", formNote: "Resist the pull — the torso should not twist at all." },
  { id: "russian-twist", name: "Russian Twist", description: "Seated rotational core movement, often performed holding a weight.", formNote: "Rotate from the ribcage, not by swinging the arms." },
  { id: "side-plank", name: "Side Plank", description: "Isometric hold on one side of the body, bracing the lateral core.", formNote: "Stack the hips and push the bottom shoulder away from the floor." },
  { id: "cable-woodchop", name: "Cable Woodchop", description: "Diagonal cable pull across the body, rotating through the trunk.", formNote: "Pivot the back foot and let the hips lead the rotation." },
  { id: "suitcase-carry", name: "Suitcase Carry", description: "Walking with a heavy load in one hand only, resisting the side bend.", formNote: "Stay perfectly upright — do not lean away from the weight." },
  { id: "side-bend", name: "Side Bend", description: "Lateral flexion of the trunk against a dumbbell or cable.", formNote: "Move only sideways; no rotation or forward lean." },

  // --- Back ---
  { id: "pull-up", name: "Pull-Up", description: "Overhand-grip vertical pull, emphasizing the lats and upper back.", formNote: "Start from a full hang and pull the elbows down toward the ribs." },
  { id: "chin-up", name: "Chin-Up", description: "Underhand-grip vertical pull, sharing load between biceps and lats.", formNote: "Keep the chest tall and finish with the bar at collarbone height." },
  { id: "lat-pulldown", name: "Lat Pulldown", description: "Cable pulldown that mimics the pull-up movement pattern.", formNote: "Pull to the upper chest; avoid leaning back to muscle the weight down." },
  { id: "straight-arm-pulldown", name: "Straight-Arm Pulldown", description: "Cable pulldown with straight arms, isolating shoulder extension.", formNote: "Keep a soft fixed elbow angle and sweep the bar to the thighs." },
  { id: "bent-over-row", name: "Bent-Over Row", description: "Hip-hinged barbell or dumbbell row targeting the mid back.", formNote: "Hinge to roughly 45° and keep the spine neutral throughout." },
  { id: "seated-cable-row", name: "Seated Cable Row", description: "Seated horizontal pull targeting the mid back and rhomboids.", formNote: "Squeeze the shoulder blades together before the elbows finish." },
  { id: "chest-supported-row", name: "Chest-Supported Row", description: "Row performed face-down on an incline bench, removing lower-back involvement.", formNote: "Let the shoulder blades fully separate at the bottom of each rep." },
  { id: "face-pull", name: "Face Pull", description: "Cable pull to face height with high elbows, hitting rear delts and mid traps.", formNote: "Pull the rope apart as it reaches the face, elbows above wrists." },
  { id: "shrug", name: "Shrug", description: "Elevating the shoulders against a loaded barbell or dumbbells.", formNote: "Straight up and down — rolling the shoulders adds nothing." },
  { id: "y-raise", name: "Prone Y-Raise", description: "Raising the arms overhead in a Y shape while lying face-down.", formNote: "Light weight; drive the arms up with the shoulder blades, not the traps." },
  { id: "upright-row", name: "Upright Row", description: "Pulling a bar up the front of the body with the elbows leading.", formNote: "Stop at chest height; go wider grip if the shoulders pinch." },
  { id: "deadlift", name: "Deadlift", description: "Hip-hinge lift of a loaded barbell from the floor to standing.", formNote: "Push the floor away with the bar tight against the legs." },
  { id: "back-extension", name: "Back Extension", description: "Hip and spinal extension performed on a hyperextension bench.", formNote: "Stop at a straight line — hyperextending the lower back adds no benefit." },
  { id: "good-morning", name: "Good Morning", description: "Bar-on-back hip hinge loading the spinal extensors and hamstrings.", formNote: "Start very light; the spine stays rigid while the hips travel back." },
  { id: "superman", name: "Superman", description: "Prone hold raising the arms and legs to extend the spine.", formNote: "Lift from the upper back, keeping the neck in line with the spine." },
  { id: "bird-dog", name: "Bird Dog", description: "Quadruped opposite arm and leg extension, training deep spinal stabilisers.", formNote: "Move slowly; a glass of water on the lower back should not spill." },

  // --- Chest ---
  { id: "bench-press", name: "Bench Press", description: "Barbell or dumbbell press performed lying on a flat bench.", formNote: "Keep the shoulder blades pinned back and touch the lower chest." },
  { id: "incline-bench-press", name: "Incline Bench Press", description: "Press on a 30–45° incline, shifting load to the upper chest.", formNote: "Past 45° the front delts take over — keep the bench shallow." },
  { id: "decline-press", name: "Decline Press", description: "Press on a declined bench, emphasising the lower chest fibres.", formNote: "Lower to the bottom of the pec, elbows tucked to about 45°." },
  { id: "push-up", name: "Push-Up", description: "Bodyweight press from a plank position.", formNote: "Body stays one rigid line; elbows back rather than flared wide." },
  { id: "chest-fly", name: "Chest Fly", description: "Arcing the arms together against cable or dumbbell resistance.", formNote: "Fixed soft elbow — the movement happens only at the shoulder." },
  { id: "dip", name: "Dip", description: "Lowering and pressing the body between parallel bars.", formNote: "Lean forward for chest emphasis, stay upright for triceps." },
  { id: "push-up-plus", name: "Push-Up Plus", description: "Push-up with an extra scapular protraction at the top.", formNote: "At lockout, push the upper back toward the ceiling." },
  { id: "landmine-press", name: "Landmine Press", description: "Pressing one end of a floor-anchored barbell up and across the body.", formNote: "Let the shoulder blade travel forward as the arm extends." },
  { id: "scapular-wall-slide", name: "Scapular Wall Slide", description: "Sliding the forearms up a wall while keeping them pinned to it.", formNote: "Keep the ribs down and both forearms in contact the whole way." },

  // --- Shoulders ---
  { id: "overhead-press", name: "Overhead Press", description: "Pressing a barbell or dumbbells from shoulder height to overhead.", formNote: "Squeeze the glutes; finish with the bar stacked over the mid-foot." },
  { id: "front-raise", name: "Front Raise", description: "Raising the arms straight forward to shoulder height.", formNote: "No swing — stop at eye level and lower under control." },
  { id: "lateral-raise", name: "Lateral Raise", description: "Raising the arms out to the sides to shoulder height.", formNote: "Lead with the elbows and stop at shoulder height." },
  { id: "reverse-fly", name: "Reverse Fly", description: "Arcing the arms apart while hinged forward, targeting the rear delts.", formNote: "Thumbs down and elbows soft; think 'spread the arms', not 'row'." },
  { id: "full-can-raise", name: "Full Can Raise", description: "Raising the arms at about 45° with thumbs up, loading supraspinatus.", formNote: "Very light — this is a small muscle in the scapular notch." },
  { id: "external-rotation", name: "External Rotation", description: "Rotating the shoulder outward against light cable or band resistance.", formNote: "Elbow pinned to the ribs; rotate only the forearm outward." },
  { id: "internal-rotation", name: "Internal Rotation", description: "Rotating the shoulder inward against light cable or band resistance.", formNote: "Keep a towel under the elbow to stop the arm drifting forward." },

  // --- Arms ---
  { id: "bicep-curl", name: "Bicep Curl", description: "Elbow flexion against resistance with a supinated grip.", formNote: "Elbows stay at the ribs; no swinging from the shoulders." },
  { id: "incline-curl", name: "Incline Dumbbell Curl", description: "Curl performed lying back on an incline, stretching the long head.", formNote: "Let the arms hang behind the torso for the full stretch." },
  { id: "preacher-curl", name: "Preacher Curl", description: "Curl with the upper arms fixed on a pad, isolating the short head.", formNote: "Do not bounce out of the bottom — control the stretched position." },
  { id: "concentration-curl", name: "Concentration Curl", description: "Seated single-arm curl with the elbow braced on the inner thigh.", formNote: "Supinate hard at the top, turning the little finger upward." },
  { id: "hammer-curl", name: "Hammer Curl", description: "Curl performed with a neutral (palms-in) grip.", formNote: "Neutral grip throughout — no rotation at the wrist." },
  { id: "reverse-curl", name: "Reverse Curl", description: "Curl with a pronated (palms-down) grip.", formNote: "Lighter than a normal curl; keep the wrists locked straight." },
  { id: "tricep-pushdown", name: "Tricep Pushdown", description: "Cable pushdown that extends the elbow against resistance.", formNote: "Upper arms glued to the sides; only the forearms move." },
  { id: "overhead-tricep-extension", name: "Overhead Tricep Extension", description: "Elbow extension with the arms overhead, stretching the long head.", formNote: "Keep the elbows pointing forward, not flaring outward." },
  { id: "skull-crusher", name: "Skull Crusher", description: "Lying elbow extension bringing the bar toward the forehead.", formNote: "Let the upper arms angle slightly back to keep tension on the long head." },
  { id: "close-grip-bench", name: "Close-Grip Bench Press", description: "Bench press with a shoulder-width grip, shifting load to the triceps.", formNote: "Grip just inside shoulder width; tuck the elbows on the descent." },

  // --- Forearms, grip and hands ---
  { id: "wrist-curl", name: "Wrist Curl", description: "Flexing the wrist against resistance to target the forearm flexors.", formNote: "Let the bar roll to the fingertips, then curl it back up." },
  { id: "reverse-wrist-curl", name: "Reverse Wrist Curl", description: "Extending the wrist against resistance to target the forearm extensors.", formNote: "Very light — the extensors are far weaker than the flexors." },
  { id: "farmers-carry", name: "Farmer's Carry", description: "Walking while carrying a heavy load in each hand.", formNote: "Tall posture, shoulders down, and do not rush the walk." },
  { id: "dead-hang", name: "Dead Hang", description: "Hanging from a bar for time, training grip endurance.", formNote: "Shoulders active rather than fully slumped into the joint." },
  { id: "forearm-pronation", name: "Forearm Pronation", description: "Rotating the palm downward against a band or offset dumbbell.", formNote: "Brace the elbow on a bench so only the forearm rotates." },
  { id: "forearm-supination", name: "Forearm Supination", description: "Rotating the palm upward against a band or offset dumbbell.", formNote: "Rotate through the full range, pausing briefly palm-up." },
  { id: "finger-extension-band", name: "Banded Finger Extension", description: "Opening the fingers against a rubber band, training the extensors.", formNote: "Balances all the gripping work — spread the fingers fully." },
  { id: "plate-pinch", name: "Plate Pinch", description: "Holding smooth weight plates pinched between thumb and fingers.", formNote: "Thumb pressure does the work; keep the wrist straight." },
  { id: "towel-grip-hold", name: "Towel Grip Hold", description: "Hanging or holding weight via a thick towel, taxing the deep finger flexors.", formNote: "A thicker grip forces the deep flexors to work harder." },

  // --- Neck ---
  { id: "neck-curl", name: "Neck Curl", description: "Resisted neck flexion, e.g. with a plate or harness.", formNote: "Slow and light; tuck the chin rather than jutting it forward." },
  { id: "neck-extension", name: "Neck Extension", description: "Resisted neck extension, e.g. with a plate or harness.", formNote: "Move through a comfortable range only — never force the end range." },
  { id: "neck-lateral-flexion", name: "Neck Side Flexion", description: "Resisted sideways tilt of the head toward the shoulder.", formNote: "Ear toward shoulder without letting the head rotate." },

  // --- Quads and knees ---
  { id: "squat", name: "Squat", description: "Hip and knee flexion/extension under load, e.g. barbell back squat.", formNote: "Knees track over the toes; hit at least parallel depth." },
  { id: "front-squat", name: "Front Squat", description: "Squat with the bar racked on the front delts, loading the quads heavily.", formNote: "Elbows high — if they drop, the bar rolls forward." },
  { id: "leg-press", name: "Leg Press", description: "Pressing a loaded sled away with the legs from a seated position.", formNote: "Do not let the lower back round off the pad at the bottom." },
  { id: "leg-extension", name: "Leg Extension", description: "Knee extension against a machine pad, isolating the quadriceps.", formNote: "Pause briefly at lockout; lower under control." },
  { id: "sissy-squat", name: "Sissy Squat", description: "Knee-dominant squat leaning back with the hips extended.", formNote: "The only quad exercise that loads rectus femoris with the hip extended." },
  { id: "lunge", name: "Lunge", description: "Single-leg stepping movement loading the quads and glutes.", formNote: "Take a long enough step that the front shin stays near vertical." },
  { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", description: "Split squat with the rear foot elevated on a bench.", formNote: "Upright torso for quads, slight forward lean for glutes." },
  { id: "step-up", name: "Step-Up", description: "Stepping onto a raised box under load, one leg at a time.", formNote: "Drive through the top foot; do not push off the trailing leg." },
  { id: "terminal-knee-extension", name: "Terminal Knee Extension", description: "Banded lockout of the final few degrees of knee extension.", formNote: "Commonly used to bias the vastus medialis near lockout." },

  // --- Hamstrings and glutes ---
  { id: "romanian-deadlift", name: "Romanian Deadlift", description: "Hip-hinge that loads the hamstrings and glutes through a stretch.", formNote: "Push the hips back; stop when the hamstrings stop stretching." },
  { id: "leg-curl", name: "Leg Curl", description: "Knee flexion against resistance, lying or seated.", formNote: "Seated versions stretch the hamstrings harder than lying ones." },
  { id: "nordic-curl", name: "Nordic Hamstring Curl", description: "Lowering the torso from kneeling while the ankles are anchored.", formNote: "Brutally hard — use a band or hands to assist at first." },
  { id: "glute-ham-raise", name: "Glute-Ham Raise", description: "Combined knee flexion and hip extension on a GHD bench.", formNote: "Keep the hips extended so the hamstrings do the knee bending." },
  { id: "hip-thrust", name: "Hip Thrust", description: "Driving the hips upward from a bench-supported position.", formNote: "Tuck the ribs and finish with a hard glute squeeze at the top." },
  { id: "glute-bridge", name: "Glute Bridge", description: "Floor-based hip extension raising the hips toward the ceiling.", formNote: "Posteriorly tilt the pelvis before lifting to spare the lower back." },
  { id: "hip-abduction", name: "Hip Abduction", description: "Pushing the leg away from the midline against a machine or band.", formNote: "A slight forward lean biases the gluteus medius." },
  { id: "banded-lateral-walk", name: "Banded Lateral Walk", description: "Side-stepping with a band around the knees or ankles.", formNote: "Stay in a half-squat and keep tension on the band throughout." },
  { id: "clamshell", name: "Clamshell", description: "Side-lying hip external rotation with the knees bent.", formNote: "Keep the pelvis stacked — do not roll backward to cheat range." },
  { id: "fire-hydrant", name: "Fire Hydrant", description: "Quadruped hip abduction and external rotation.", formNote: "Keep the hips level and the supporting side braced." },
  { id: "seated-hip-external-rotation", name: "Seated Hip External Rotation", description: "Rotating the thigh outward against a band while seated.", formNote: "Targets the deep six rotators that larger lifts barely reach." },
  { id: "90-90-hip-switch", name: "90/90 Hip Switch", description: "Rotating between 90/90 seated positions to drive hip rotation range.", formNote: "Move slowly and stay tall through the spine." },

  // --- Adductors and hip flexors ---
  { id: "cable-hip-adduction", name: "Cable Hip Adduction", description: "Pulling the leg inward across the body against cable resistance.", formNote: "Full range in and a controlled stretch on the way out." },
  { id: "sumo-squat", name: "Sumo Squat", description: "Wide-stance squat that emphasises the inner thigh.", formNote: "Toes turned out, knees tracking in line with them." },
  { id: "copenhagen-plank", name: "Copenhagen Plank", description: "Side plank with the top leg supported, loading the adductors hard.", formNote: "Start with the knee supported rather than the ankle." },
  { id: "cossack-squat", name: "Cossack Squat", description: "Wide lateral squat shifting weight side to side.", formNote: "Keep the extended leg's heel down and toes up." },
  { id: "hanging-knee-raise", name: "Hanging Knee Raise", description: "Raising the knees toward the chest while hanging from a bar.", formNote: "Unlike the leg raise, let the hip flexors drive this one." },
  { id: "standing-knee-raise", name: "Standing Knee Raise", description: "Lifting one knee toward the chest while standing, often banded.", formNote: "Drive above 90° of hip flexion to reach the psoas." },
  { id: "psoas-march", name: "Psoas March", description: "Alternating banded hip flexion from a bridged or supine position.", formNote: "Keep the lower back flat; move one leg at a time." },

  // --- Calves and lower leg ---
  { id: "calf-raise", name: "Standing Calf Raise", description: "Rising onto the toes with the knee straight.", formNote: "Straight knee targets the gastrocnemius; pause at the top." },
  { id: "seated-calf-raise", name: "Seated Calf Raise", description: "Calf raise performed with the knee bent.", formNote: "The bent knee takes the gastrocnemius out, isolating the soleus." },
  { id: "tibialis-raise", name: "Tibialis Raise", description: "Dorsiflexing the ankle against resistance to target the shin.", formNote: "Heels against a wall, pulling the toes up as far as possible." },
  { id: "ankle-eversion", name: "Banded Ankle Eversion", description: "Turning the sole of the foot outward against a band.", formNote: "Move only at the ankle; keep the knee still." },
  { id: "ankle-inversion", name: "Banded Ankle Inversion", description: "Turning the sole of the foot inward against a band.", formNote: "Small, controlled range — this is a stabiliser, not a prime mover." },
  { id: "toe-curl", name: "Towel Toe Curl", description: "Scrunching a towel toward you with the toes.", formNote: "Keep the heel planted and curl only the toes." },
  { id: "toe-raise-walk", name: "Toe Raise Walk", description: "Walking on the heels with the toes pulled up.", formNote: "Pull the toes as high as possible with every step." },
];

export const exercises: Record<string, Exercise> = Object.fromEntries(
  catalogue.map((exercise) => [exercise.id, exercise]),
);
