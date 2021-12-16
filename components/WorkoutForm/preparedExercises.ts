import { Tag } from "../../types/Tag";

type PreparedExercise = {
  name: string;
  description: string;
  tags: Tag[];
}[];

/**
 * preparedExercises
 * 
 * Common exercises that can help speed up creation of workouts.
 */
export const preparedExercises: PreparedExercise = [
  {
    name: "Calf-Raise",
    description:
      "From a standing position, slowly rise up on to the toes, keeping the knees straight and heels off the floor. Hold briefly, then come back down.",
    tags: ["legs", "lower-body"],
  },
  {
    name: "Squat Calf-Raise",
    description:
      "Hang on to the back of a chair for stability and sink down in to a squat position. Shift your weight on to your toes and steadily push-up and down. Maintain your hip and knee angles to prevent it from turning in to a squat.",
    tags: ["legs", "lower-body"],
  },
  {
    name: "Single-Leg Calf-Raise",
    description:
      "Start from the floor and then do it from a step to increase the difficulty.",
    tags: ["legs", "lower-body"],
  },
  {
    name: "Stiff-Leg Ankle Hop",
    description:
      "Get in to a rhythm and act like a pogo stick, using the calves to spring up and down. Try not to bend at the knees and hips, which brings in the quadriceps and glutes. Although the knees will bend slightly, stay upright and focus on using the calves for movement.",
    tags: ["body-weight", "legs", "lower-body", "balance"],
  },
  {
    name: "Wall Sit",
    description:
      "Slide your back down a wall until your thighs are parallel to the ground. Keep your back straight up against the wall.",
    tags: ["core"],
  },
  {
    name: "Sumo Squat",
    description:
      "Take a very wide stance and cross your arms in front of you. Begin the squat by sitting back, and focussing on keeping your chest up and knees pushed out.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Air Squat",
    description:
      "Stand with your feet hip-width apart and your feet facing forward. Slowly sit back by bending the hips and knees until the thighs are parallel to the floor. Keep your weight on your heels throughout the movement and press through them to return to a standing position.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Step-Up",
    description:
      "Find a step or bench, and place one foot on the raised surface. Step up until the front leg is straight, and then return to start by stepping down (don\u2019t jump!)",
    tags: ["legs", "lower-body", "balance"],
  },
  {
    name: "Static Lunge",
    description:
      "Stand with your hands on the hips and take a long stride forward. Your feet will stay in this position throughout the exercise. Slowly lower your body until the knee of your opposite leg is close to or touching the floor. Push back up into the starting position and repeat with the opposite leg.",
    tags: ["lower-body"],
  },
  {
    name: "Forward Lunge",
    description:
      "Lunge stepping forward and then pushing back up to stand with your feet together.",
    tags: ["lower-body"],
  },
  {
    name: "Reverse Lunge",
    description:
      "Rather than stepping forward, try taking a long stride backwards to place added emphasis on the hips.",
    tags: ["lower-body"],
  },
  {
    name: "Bulgarian Split Squat",
    description:
      "Stand in front of a raised surface and place one foot behind you (laces down) on said surface. Keeping your torso upright, descend until the knee of your rear leg touches the ground, and then push back up to return to the starting position. Make sure the knee of your front leg doesn\u2019t move past the toes.",
    tags: ["lower-body"],
  },
  {
    name: "Single-Leg Box Squat",
    description:
      "Standing in front on a raised surface (such as a chair, stool or step), stand on one leg and sit back on to the surface behind you. Keep your arms out in front of you as a counterbalance and try to keep your torso upright throughout.",
    tags: ["lower-body"],
  },
  {
    name: "Skater Squat",
    description:
      "Stand on one leg with your hands out in front of you as a counter balance. With your other leg out behind you and a slight forward lean, sit back until the knee of the rear leg comes close to the ground. Quickly push back up to the starting position.",
    tags: ["lower-body"],
  },
  {
    name: "Shrimp Squat",
    description:
      "Begin in an upright position, then bend one knee so you can grab your ankle behind your back (just like you would if you were stretching your quads). From there, slowly lower yourself down until your knee touches the ground, then stand back up.",
    tags: ["lower-body"],
  },
  {
    name: "Pistol Squat",
    description:
      "Hold one leg out in front of you from a standing position and squat down while keeping your weight on your back foot.",
    tags: ["lower-body", "legs", "balance"],
  },
  {
    name: "Glute Bridge",
    description:
      "Lie on your back with your knees bent at 90 degrees and your hands at your sides. Push through your heels and use your glutes to lift your hips as high as possible. Pause at the top and slowly return to the starting position.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Side Lying Clam",
    description:
      "Lie on your side with your knees bent at 90 degrees and heels touching each other. Open your knees by flexing your glutes and hold the position. Slowly return to the starting position.",
    tags: ["core", "lower-body"],
  },
  {
    name: "Donkey Kick",
    description:
      "Get down on all fours with your back flat. Kick one leg to the rear and slowly return to the starting position. Repeat with the opposite leg.",
    tags: ["legs", "lower-body", "core"],
  },
  {
    name: "Bent-Leg Donkey Kick",
    description:
      "Kneel down on all fours with your legs bent at 90 degrees. Quickly lift one leg up behind you. Return to the starting position and repeat with the opposite leg. This variation places more emphasis on the glutes, and less on the hamstrings.",
    tags: ["legs", "lower-body", "core"],
  },
  {
    name: "Single-Leg Romanian Deadlift",
    description:
      "Stand up with your feet together. Lower your arms and torso in front of you while raising one leg behind the body. Keep the opposite knee slightly bent and reach the arms as close to the floor as possible. To return to the starting position, raise your torso while lowering the back leg.",
    tags: ["back", "balance"],
  },
  {
    name: "Single-Leg Glute Bridge",
    description:
      "Lie on the floor with your hands at your side. Bend one leg and keep one straight. Perform the bridging movement by pushing through the heel on the floor and squeezing your glutes.",
    tags: ["core", "lower-body"],
  },
  {
    name: "Shoulders-Elevated Hip Raise",
    description:
      "Place your shoulders on a chair, bench, or bed. With your hands at the side of your head, push through your heels and squeeze your glutes to lift your hips as high as possible. Hold the top position for a few seconds before returning to the ground.",
    tags: ["lower-body"],
  },
  {
    name: "Single-Leg Shoulders Elevated Hip Raise",
    description:
      "Bend the leg you aren\u2019t using to begin with, and then try it with your leg straight out in front of you to make it more difficult.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Russian Leg Curl",
    description:
      "Find something stable to hook your heels under (such as a bed) and kneel on something soft (such as a pillow or towel). Keeping your body upright and glutes tight, lower your body towards the floor. As you near the floor, catch yourself in a push-up position and try to use your hamstrings as much as possible to spring back up to the starting position.",
    tags: ["legs", "lower-body"],
  },
  {
    name: "Shoulders-and-Feet-Elevated Hip Raise",
    description:
      "Raising both the shoulders and feet makes this exercise considerably more difficult because the hips have to go through a much larger range of motion. Using a raised surface such as a chair or bed for your upper back, place your feet on another surface (such as a stool) that is roughly the same height. From there squeeze your glutes to lift your hips as high as possible, as in other variations of this exercise.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Single-Leg Shoulders-and-Feet-Elevated Hip Raise",
    description:
      "Set up for Shoulders-and-Feet-Elevated Hip Raise, but only place one foot on a raised surface instead of two.",
    tags: ["lower-body", "core"],
  },
  {
    name: "Sit-Up",
    description:
      "Lying on the ground with your knees bent, contract your abs to lift your body off the ground. Try to limit movement in the lower back.",
    tags: ["core"],
  },
  {
    name: "Twisting Sit-Up",
    description:
      "Do a sit-up, but at the top of the movement bring the opposite elbow towards the knee. Avoid over-rotating, and keep your chest up throughout to avoid excessively rounding your back.",
    tags: ["core"],
  },
  {
    name: "Crunch",
    description:
      "Lie on your back with your knees bent and feet flat on the floor. With your hands behind the head, contract your core and curl your upper back up from the floor. Hold briefly, and then lower yourself back down.",
    tags: ["core"],
  },
  {
    name: "Reverse Crunch",
    description:
      "Lie flat on the ground with your hips flexed at 90 degree and knees bent. Pull your knees towards your head to lift your buttocks off the ground. Done correctly, this variation recruits more of the lower abs and obliques than the regular crunch.",
    tags: ["core"],
  },
  {
    name: "Side Crunch",
    description:
      "Set up in the same position as the regular crunch. As you lift your upper body up from the floor, keep your hands behind your head and reach one of your elbows towards the opposite knee.",
    tags: ["core"],
  },
  {
    name: "Flutter Kick",
    description:
      "Start lying on your back with arms at your sides and palms facing down. With your legs extended, lift the heels a few inches off the ground. Engage your core, and make small up-and-down kicks with the legs.",
    tags: ["core", "lower-body"],
  },
  {
    name: "Bicycle",
    description:
      "Lie down on the ground with your knees bent and hands behind your head. Lift your legs off the ground and make a pedalling motion (like you\u2019re riding a bicycle!). With your hands behind your head, bring your opposing elbow to meet each leg as it comes toward you.",
    tags: ["core", "lower-body"],
  },
  {
    name: "Superman",
    description:
      "Lie face-down on the ground with your arms outstretched in front of you. Simultaneously lift your arms, legs and torso off the ground. Focus on squeezing your glutes throughout.",
    tags: ["core", "full-body"],
  },
  {
    name: "Bird Dog",
    description:
      "Start on all fours with your back flat. Raise one arm forward while simultaneously lifting your opposite leg until both limbs are in line with your torso. Slowly bring your leg and arm back to the starting position and then repeat with the opposite limbs.",
    tags: ["core", "balance", "full-body"],
  },
  {
    name: "Dead Bug",
    description:
      "Lying flat on your back with your knees bent at 90 degrees and your arms pointing towards the ceiling. Flatten your back against the floor and exhale as you lower one leg and the opposing arm until they are just hovering above the ground. Pause, return to the starting position, and then repeat with the opposing limbs.",
    tags: ["balance", "core"],
  },
  {
    name: "Plank",
    description:
      "Lie face down with your forearms on the floor and hands clasped. Extend the legs behind you and rise up on to your toes. Keeping the back straight, tighten your core, quads and glutes and hold the position.",
    tags: ["core", "full-body"],
  },
  {
    name: "Feet-Elevated Plank",
    description:
      "Make the conventional plank more difficult by finding a raised surface such as a chair or low table (you don\u2019t want the surface to be too high).",
    tags: ["core", "full-body"],
  },
  {
    name: "Side Plank: Left",
    description:
      "On your left side, with just one foot and one forearm touching the ground, raise your body up and keep your body in a straight line.",
    tags: ["core"],
  },
  {
    name: "Side Plank: Right",
    description:
      "On your right side, with just one foot and one forearm touching the ground, raise your body up and keep your body in a straight line.",
    tags: ["core"],
  },
  {
    name: "Feet-Elevated Side Plank",
    description: "Elevate your feet while doing side plank.",
    tags: ["core"],
  },
  {
    name: "RKC Plank",
    description:
      "Get in to the regular plank position, but place your arms out further in front of you, and a little closer together. Squeeze your glutes, quads and abs as hard as you possibly can.",
    tags: ["core"],
  },
  {
    name: "Lying Straight-Leg Raise",
    description:
      "Lie flat on the ground with your legs straight. Contract your abdominals and lift your legs until your hips are bent at 90 degrees. Lower the legs slowly to the ground.",
    tags: ["core"],
  },
  {
    name: "Hanging Knee-Tuck",
    description:
      "Hanging from a bar or rafter, pull your knees towards your chest. Keep your abs braced, and avoid swinging.",
    tags: ["core", "lats", "back"],
  },
  {
    name: "Hanging Leg-Raise",
    description: "Hang from a bar or rafter, with your legs straight.",
    tags: ["core", "lats", "back"],
  },
  {
    name: "Oblique Hanging Leg-Raise",
    description:
      "Hanging from a bar or rafter, bend your knees and pull them to one side to target your obliques. Return to the starting position and repeat with the opposite side.",
    tags: ["core", "lats", "back"],
  },
  {
    name: "Windshield Wiper",
    description:
      "Lying on your back with your arms spread wide for stability, lift your legs so that your hips are bent 90 degrees. Keeping your core tight, rotate you legs from side to side to mimic windscreen wipers. Spare the spine by limiting your range of motion.",
    tags: ["core"],
  },
  {
    name: "L-Sit",
    description:
      "Sit on the ground with your feet out in front of you and your arms at your sides. Place your hands at your sides and lift your entire body off the ground while keeping your legs out straight in front of you.",
    tags: ["core"],
  },
  {
    name: "Dragon Flag",
    description:
      "Lie flat on your back and hold on to something behind your head. With nothing but your upper back on the floor, lift your entire body off the floor and keep it in a straight line.",
    tags: ["core"],
  },
  {
    name: "Doorway Row",
    description:
      "Stand near a doorway or vertical pole. Get into a half squat position and hang on to the doorway with one arm. Pull yourself towards the door way, and slowly return to the starting position.",
    tags: [],
  },
  {
    name: "Inverted Curl",
    description:
      "Lie under the table and grab the edge with your palms facing you. Bend your knees 90 degrees and keep your body in a straight line by bracing your glutes and abs. Raise your body to the underside of the table by bending your elbows.",
    tags: [],
  },
  {
    name: "Inverted Row",
    description:
      "Head out and find a playground with some horizontal bars, or use the underside of a table again. If you\u2019re using a bar grab it with your palms facing away from you, and if you\u2019re using a table grab the outer edges. Pull your body up until your chest meets the surface, and slowly lower yourself back to a hanging position.",
    tags: [],
  },
  {
    name: "Eccentric Chin / Pull-Ups",
    description:
      "Raised on a bar, slowly lowering yourself back down the ground.",
    tags: ["back", "lats", "upper-body"],
  },
  {
    name: "Chin-Up",
    description:
      "Hang from a secure bar or rafter with your palms facing towards you. Keep your body in a straight line by tightening your core and glutes. Pull yourself towards the bar, pause, and return to the dead hang position. Try to imagine tucking your shoulder blades into your back pockets.",
    tags: ["back", "lats", "upper-body"],
  },
  {
    name: "Pull-Up",
    description:
      "Most people find pull-ups (palms facing away) more difficult than chin-ups because of the reduced involvement of the biceps. I\u2019d recommend heading out to find a playground to do your pull-ups, but you can do them using a sturdy (not hollow, or plywood) door with a towel wedged underneath to stop it swinging.",
    tags: ["back", "lats", "upper-body"],
  },
  {
    name: "Feet-Elevated Inverted Row",
    description:
      "Should the regular inverted row become too easy, you can make it more difficult by elevating your feet on something such as a chair. Remember to keep your body in a straight line.",
    tags: [],
  },
  {
    name: "Side-To-Side Pull-Up",
    description:
      "Set up just as you would for a normal pull-up (palms away from you), but pull your body to one side to add emphasis to that side. Switch sides with each rep.",
    tags: ["back", "lats", "upper-body"],
  },
  {
    name: "One-Arm Inverted Row",
    description:
      "This is quite a jump from the two-arm inverted row variations, so I suggest you start with a surface that allows you to position yourself at an incline. Gradually reduce the incline until you are able to perform it from the ground.",
    tags: [],
  },
  {
    name: "One-Arm Chin-Up",
    description:
      "One-arm chin-ups are one of impressive exercises in existence, and elude many hardcore exercisers for years. To qualify as a real one-arm chin-up you shouldn\u2019t be holding on to the wrist of your working arm, which is what makes it so difficult. If you\u2019re interested in giving it a go, I recommend this tutorial by Al Kavadlo.",
    tags: ["back", "lats", "upper-body"],
  },
  {
    name: "YTWL",
    description:
      "The YTWL is great for strengthening many of the smaller muscles in the shoulder joint. From a standing position, bend at the hips and keep your back straight. From there, make 10 Y, T, W, L motions with the arms (watch the video to understand what I mean).",
    tags: [],
  },
  {
    name: "Wall Push-Up",
    description:
      "Rather than doing \u2018girl\u2019 push-ups, start against a wall instead.  You can gradually reduce the elevation until you are to perform a normal push-up from the ground. Place your hands just beyond shoulder width, and feet away from the wall. Lower your body towards the wall while keeping your core and glutes tight to keep you body in a straight line.",
    tags: ["upper-body", "chest"],
  },
  {
    name: "Torso-Elevated Push-Up",
    description:
      "Keeping your elbows close to your body, and your glutes and core braced, lower yourself until your chest touches the surface. Push yourself back up to the starting position.",
    tags: ["upper-body", "chest"],
  },
  {
    name: "Push-Up",
    description:
      "Position your hands shoulder-width apart and brace your core to make your body into a straight line. Bend at the elbows until your chest touches the floor, and then quickly push back up to return to the starting position. Keep your elbows close to your body throughout.",
    tags: ["upper-body", "chest"],
  },
  {
    name: "Bench Dip",
    description:
      "Sit on the floor with a step or a bench behind you. Keeping your legs straight and heels on the ground, hold on to the edge of the elevated surface and press yourself up. Slowly lower yourself down by bending your elbows 90 degrees.",
    tags: ["upper-body", "chest"],
  },
  {
    name: "Push-Back",
    description:
      "Set up as you would for a push-up, but place your feet further apart and keep your hips up. Instead of pushing up, push back. This variation will train your shoulders and prepare for you some difficult bodyweight exercises.",
    tags: ["shoulders", "upper-body"],
  },
  {
    name: "Spiderman Push-Up",
    description:
      "Assume the standard push-up position. As you lower your body toward the floor, lift one foot off the floor and try to touch your knee to your elbow. Reverse the movement, and do the same on the opposite side.",
    tags: ["upper-body", "chest", "core"],
  },
  {
    name: "Triceps Extension",
    description:
      "Place your hands on the edge of a table or chair, and back your feet away. Keeping your body in a straight line, and your weight on your toes, lower your body to the surface by bending your elbows. Raise yourself back up by reversing the movement.",
    tags: ["arms"],
  },
  {
    name: "Feet-Elevated Push-Up",
    description:
      "By elevating your feet you place greater emphasis on the musculature of the upper chest, and use a greater percentage of your bodyweight to make this more difficult than a regular push-up.",
    tags: ["upper-body", "chest"],
  },
  {
    name: "Chest Dip",
    description:
      "Centre yourself between the surfaces you are using and lift yourself off the ground. Keeping the forearms vertical and your elbows close to your body, bend at the elbows until your arms are bent 90 degrees. Push back up to the starting position.",
    tags: ["chest"],
  },
  {
    name: "Hindu Push-Up",
    description:
      "Get into a regular push-up position, but with your feet slightly wider than hip-width. Lift your buttocks into the air while keeping your arms, legs and back straight. Bend your elbows, and as your body approaches the floor arch your back so you are looking towards the ceiling. Straighten your arms, and proceed to reverse the movement.",
    tags: ["upper-body"],
  },
  {
    name: "Diamond Push-Up",
    description:
      "Place your hands on the ground with your thumbs and index fingers touching to make a diamond shape (hence the name). Proceed to do a push-up while keeping your elbows close to your body. This variation places emphasis on the triceps.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Wide Push-Ups",
    description:
      "The wide push-up targets the chest musculature differently to other push-up variations because of the disadvantage you are putting yourself at. Don\u2019t go crazy though \u2013 place your hands 3 or 4 inches beyond shoulder width.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Side-To-Side Push-Up",
    description:
      "Begin in the standard push-up position, but as you descend lean to one side to add more stress to that side. Switch the side you lean towards with each rep.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Feet-Elevated Pike Push-Up",
    description:
      "Place your hands on the floor just wider than shoulder width, and your feet on a sturdy chair or bench. Walk you hands back a bit and lift you hips as high as you can. Lower your body towards the ground by bending your elbows. Push back up to return to the starting position.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Assisted One-Arm Push-Up",
    description:
      "Get into a standard push-up position, but place one arm on a stable, raised surface. Relying on the arm on the ground as much as possible, lower yourself down to the ground and push back up. This is a great way of training for the one-arm push-up.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Wall Handstand Push-Up",
    description:
      "Starting on your hands and knees, place your feet against a wall and walk your feet up until you are in a handstand position. Lower yourself slowly by bending your elbows until your head touches the floor. Reverse the movement to return to the starting position. You can make this more difficult by moving your feet away from the wall.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "One-Arm Push-Up",
    description:
      "Rather than getting into a regular push-up position, take a very wide stance, and place only one arm on the ground in front of you. Keeping the arm on the ground close to your torso, lower your body towards the ground. When you push yourself back up to the starting position, try to avoid twisting.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Crab Walk",
    description:
      "Facing up, use your hands and feet to lift your buttocks off the ground. Keeping your hips high, walk yourself backwards using same-side patterns of leg and arm movement. After going backwards, reverse the movement to go forwards and return to the start.",
    tags: ["full-body"],
  },
  {
    name: "Inchworm",
    description:
      "Stand up tall with the legs straight, and drop your hands to the floor. Keeping your legs straight (but not locked), slowly lower your body towards the floor, and then walk the hands forward. Once in a push-up position, start taking tiny steps until the feet meet the hands.",
    tags: [],
  },
  {
    name: "Bear Crawl",
    description:
      "Starting on your hands and knees, rise up onto the toes, tighten the core, and slowly reach forward with the right arm and right knee, followed by the left side.",
    tags: ["full-body"],
  },
  {
    name: "Crocodile Crawl",
    description:
      "The crocodile crawl is more challenging than you might think. Keeping your head and neck in neutral alignment, get on all fours with your weight on your hands and feet. Crawl forward like a crocodile by keeping your torso low to the ground, and using your opposing limbs.",
    tags: [],
  },
  {
    name: "Mountain Climber",
    description:
      "Starting on your hands and knees, bring the left knee forward directly under the chest while straightening the right leg. With your hands on the ground and core tight, jump and switch legs. The left leg should now be extended behind the body with the right knee forward.",
    tags: ["core", "full-body"],
  },
  {
    name: "Frog Stand",
    description:
      "Get into the bottom of a squat and place your hands in front of your toes. With your knees resting against your elbows, gradually lean forward until only your hands are on the floor. Once mastered, you can tuck your knees into your chest instead of resting them on your elbows, and as time goes by try extending your legs out behind you.",
    tags: [],
  },
  {
    name: "Planche",
    description:
      "If you\u2019ve been practising your frog stands and progressions for long enough, the day may finally arrive when you can fully extend your legs out behind you with nothing but your hands in contact with the ground. This is a full planche, and is seriously impressive. Still too easy? Try fingertip push-up planches (as in the video above), you maniac.",
    tags: [],
  },
  {
    name: "Back Lever",
    description:
      "The back lever involves hanging from a bar, with your chest facing towards the ground, and holding your body parallel to the ground.",
    tags: ["back", "lats"],
  },
  {
    name: "Front Lever",
    description:
      "The front lever is similar to the back lever, except this time your chest will be facing upwards.",
    tags: ["core", "full-body"],
  },
  {
    name: "Muscle-Up",
    description:
      "Grab on to a bar or rafter that you can hang from. From there, swing forward to get some momentum and then pull-up as explosively as possible. Keep rising until you\u2019re in a dip position above the bar.",
    tags: ["upper-body", "lats"],
  },
  {
    name: "Human Flag",
    description:
      "The human flag is an extremely advanced exercise where one holds onto a vertical object and, with the arms straight, holds their body horizontal to the ground.",
    tags: ["core"],
  },
  {
    name: "Jumping Jack",
    description:
      "Jump and spread your legs to your side while simultaneously lifting the arms. As soon as you land spring back into the starting position.",
    tags: ["full-body"],
  },
  {
    name: "Jumping Rope",
    description: "Jump rope!",
    tags: ["full-body", "cardio", "coordination"],
  },
  {
    name: "Jump Squat",
    description:
      "Start by doing a regular squat, but jump up explosively from the bottom position. When you land, lower your body back into the squat position to complete one rep.",
    tags: ["lower-body"],
  },
  {
    name: "Lateral Jump",
    description:
      "You can simply jump side-to-side, or find something to jump over instead. Keep your feet together and lift your knees to your torso as you jump. Land as softly as possible.",
    tags: ["lower-body", "cardio"],
  },
  {
    name: "Tuck Jump",
    description:
      "Standing with your knees slightly bent, jump up as high as possible and bring your knees in toward your chest while extending the arms straight out. Land with the knees slightly bent and quickly repeat the movement!",
    tags: ["full-body", "cardio"],
  },
  {
    name: "Jumping Lunge",
    description:
      "Jump into the air and alternate legs with each rep. Spring straight up into the air as high as possible and absorb the landing by sinking into a lunge position. Repeat.",
    tags: ["lower-body", "cardio"],
  },
  {
    name: "Burpee",
    description:
      "From a standing position, squat down and place your hands in front of you. Kick back your feet into a push-up position, and then quickly bring them forward to land in a squat position. Jump up so your feet leave the ground. That\u2019s one rep.",
    tags: ["full-body", "cardio"],
  },
  {
    name: "Clapping Push-Up",
    description:
      "Get into a normal push-up position and lower yourself to the ground. Once there, forcefully push-up to propel your upper body away from the ground. Clap in the air and catch your body in the push-up position. Try to make sure each rep is as explosive as the last.",
    tags: ["chest"],
  },
  {
    name: "Knee-Slap Push-Up",
    description:
      "For this variation, you need enough strength and power in your upper body to get yourself airborne. Lower your body until your chest touches the ground and push explosively upward, bringing your entire body up into the air. Bend your knees forward and slap your hands against your knees. Quickly return your hands and feet to their original push-up position to land safely.",
    tags: ["chest"],
  },
  {
    name: "Jumping Skater Squat",
    description:
      "Jump straight up from the bottom of a skater squat, or jump side-to-side.",
    tags: ["lower-body"],
  },
  {
    name: "Single-Leg Jump Squat",
    description:
      "Balance on one leg and squat down into a pistol squat. Push up with enough force to launch yourself in to the air. Don\u2019t forget to switch legs.",
    tags: ["legs", "lower-body"],
  },
  {
    name: "Flying Superman Push-Up",
    description:
      "Set up for a regular push-up and lower yourself to the ground, but explode upwards and throw your hands out forward while lifting your legs off the ground, so that your body is completely airborne and parallel with the ground.",
    tags: ["chest", "upper-body"],
  },
  {
    name: "Aztec Push-Up",
    description:
      "Explode away from the floor and touch your fingers to your toes in the air.",
    tags: ["chest", "upper-body"],
  },
];
