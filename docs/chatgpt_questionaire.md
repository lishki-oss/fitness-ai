# Digital Intake Questionnaire Specification

## Purpose
Build a structured digital intake questionnaire for a nutrition, weight management, movement, Pilates, lifestyle, and wellness program. The questionnaire is completed before or during the paid initial diagnostic session. The system must collect structured data that can later be processed by AI agents and reviewed by the professional team.

The questionnaire must support:
1. Client intake
2. Health and risk screening
3. Nutrition preference mapping
4. Lifestyle and behavioral pattern detection
5. Food quantity preference detection
6. Movement and Pilates matching
7. Support style matching
8. AI-generated internal summary
9. AI-generated client-facing summary
10. Initial menu structure recommendation
11. Recommended service track

## Core Product Context
The initial diagnosis is a paid standalone product.

Initial diagnosis includes:
- Deep intake questionnaire
- Body weight and body composition measurement
- Initial nutrition plan
- AI-generated diagnostic summary
- Professional review and approval
- Recommended continuation track

The initial diagnosis fee is not deducted from future programs.

## UX Requirements
1. Mobile-first wizard format.
2. One section per screen.
3. Mostly multiple-choice questions.
4. Add an "Other, please specify" option wherever relevant.
5. Sensitive questions must include "Prefer not to answer".
6. If the user answers "Yes" to medical, medication, supplement, surgery, hospitalization, injury, accident, pain, allergy, pregnancy, breastfeeding, fertility, eating disorder, or weight-loss medication questions, open a structured conditional detail field.
7. Do not show the full questionnaire as one long page.
8. Save progress automatically.
9. Store answers in a structured database, not only as free text.
10. At the end, generate structured JSON for AI processing.
11. Admin must be able to edit answers before generating final outputs.
12. Professional approval is required before any nutrition or health-related recommendation is sent to the client.

## Question Types
Use these field types:
- single_choice
- multi_choice
- text
- number
- date
- rating_1_5
- file_upload
- checkbox_required
- conditional_group
- table_input

## Data Entities
Use this data model:
- ClientProfile
- ConsentRecord
- Assessment
- BodyMetrics
- Goals
- LifestyleAndWork
- MedicalHistory
- Medication
- Supplement
- PainkillerUse
- WeightLossMedication
- PregnancyHistory
- SleepAndStress
- Digestion
- EatingHabits
- QuantityPreference
- FoodPreferences
- FoodRestrictions
- ExerciseProfile
- LearningSupport
- AIOutput
- StaffReview

## Global Conditional Rule
Every question that may indicate risk, limitation, medication, allergy, pain, sensitivity, pregnancy, breastfeeding, surgery, hospitalization, injury, eating disorder history, or professional concern must open a structured follow-up field when the answer is positive or uncertain.

---

# Section 1: Personal Details

## Fields

client_name
- type: text
- required: true

age
- type: number
- required: true

birth_date
- type: date
- required: true

phone
- type: text
- required: true

email
- type: text
- required: true

city
- type: text
- required: false

marital_status
- type: single_choice
- options:
  - Single
  - Married
  - Divorced
  - In a relationship
  - Widowed
  - Other, please specify

children_count
- type: single_choice
- options:
  - None
  - 1
  - 2
  - 3
  - 4 or more

referral_source
- type: single_choice
- options:
  - Existing studio client
  - Friend referral
  - Instagram
  - Facebook
  - Lecture or workshop
  - Google search
  - WhatsApp
  - Other, please specify

current_studio_client
- type: single_choice
- options:
  - Yes
  - No
  - I trained there in the past
  - I am interested in joining

---

# Section 2: Required Consents

Each item must be a required checkbox with timestamped consent storage.

consent_digital_questionnaire
- type: checkbox_required
- label: I approve completing a digital questionnaire as part of a nutrition, lifestyle, and wellness assessment.

consent_health_info
- type: checkbox_required
- label: I approve providing personal health, lifestyle, nutrition, movement, and body measurement information for the purpose of adapting the program.

consent_ai_processing
- type: checkbox_required
- label: I approve the use of an AI-assisted system to organize, summarize, and analyze my answers for professional review.

consent_not_medical_advice
- type: checkbox_required
- label: I understand that the program does not replace medical advice, medical diagnosis, medical treatment, or consultation with a licensed healthcare professional.

consent_update_changes
- type: checkbox_required
- label: I agree to update the team about any meaningful change in my medical condition, medications, pregnancy, breastfeeding, eating disorder status, or general health.

consent_anonymized_data_optional
- type: checkbox_required_or_optional_by_legal_policy
- label: I approve the use of anonymized and aggregated data for research, service improvement, and program optimization.

---

# Section 3: Goals

goal_main
- type: multi_choice
- required: true
- options:
  - Weight loss
  - Fat percentage reduction
  - Body toning
  - Better health
  - More energy
  - Balanced eating
  - Reduced snacking
  - Better body feeling
  - Building a routine
  - I am not sure yet
  - Other, please specify

weight_importance
- type: single_choice
- options:
  - Very important
  - Important, but not the only measure
  - Less important than body measurements or feeling
  - Not important
  - Not sure

target_weight_loss
- type: single_choice
- options:
  - I do not want to lose weight
  - 1 to 3 kg
  - 4 to 6 kg
  - 7 to 10 kg
  - More than 10 kg
  - Not sure

desired_timeline
- type: single_choice
- options:
  - 1 month
  - 3 months
  - 6 months
  - 1 year
  - No specific deadline

main_success_metric
- type: single_choice
- options:
  - Weight loss
  - Feeling in control
  - Reducing snacking
  - Feeling lighter
  - Improving blood tests
  - Looking better
  - Improving strength and movement
  - Improving body confidence
  - Other, please specify

past_attempts
- type: multi_choice
- options:
  - Diet on my own
  - Personalized dietitian plan
  - Weight-loss group
  - Nutrition app
  - Intermittent fasting
  - Low-carb diet
  - Exercise only
  - Weight-loss medication
  - I have not tried before
  - Other, please specify

dropout_reason
- type: multi_choice
- options:
  - Lack of time
  - Hunger
  - Boredom with the menu
  - Emotional overload
  - Lack of results
  - Events and weekends
  - Difficulty cooking
  - Difficulty with consistency
  - Lack of support at home
  - Other, please specify

commitment_level
- type: rating_1_5
- label: Current commitment level
- scale: 1 = very low, 5 = very high

---

# Section 4: Body Metrics and Blood Tests

## Client-filled fields

height_cm
- type: number
- required: true

knows_current_weight
- type: single_choice
- options:
  - Yes
  - No
  - Prefer not to state

blood_tests_last_year
- type: single_choice
- options:
  - Yes
  - No
  - Not sure

abnormal_blood_tests
- type: single_choice
- options:
  - Yes
  - No
  - Not sure

If abnormal_blood_tests is Yes or Not sure, open:

abnormal_blood_tests_types
- type: multi_choice
- options:
  - Blood sugar
  - Cholesterol
  - Triglycerides
  - Iron
  - Ferritin
  - B12
  - Vitamin D
  - Thyroid
  - Liver function
  - Kidney function
  - Hormones
  - Other, please specify
  - Not sure

blood_test_file
- type: file_upload
- required: false

## Staff-only fields

start_weight_kg
- type: number

body_fat_percent
- type: number

muscle_mass
- type: number

waist_cm
- type: number

hips_cm
- type: number

measurement_date
- type: date

measurement_notes
- type: text

---

# Section 5: Work, Daily Routine, and Stress

occupation_area
- type: single_choice
- options:
  - High tech
  - Management
  - Education
  - Therapy or care work
  - Administration
  - Sales
  - Self-employed
  - Business owner
  - Physical work
  - Not currently working
  - Other, please specify

work_pattern
- type: single_choice
- options:
  - Mostly sitting
  - Mostly standing
  - Mostly moving
  - Mixed
  - Changes from day to day

work_hours_daily
- type: single_choice
- options:
  - Up to 4 hours
  - 5 to 7 hours
  - 8 to 10 hours
  - More than 10 hours

can_eat_regularly_at_work
- type: single_choice
- options:
  - Yes
  - Partly
  - Almost never
  - Depends on the day

where_eats_workday
- type: multi_choice
- options:
  - At home
  - At the office
  - In the car
  - Restaurants
  - Ordered food
  - I do not eat regularly
  - Other, please specify

has_fridge_microwave
- type: single_choice
- options:
  - Yes
  - No
  - Partly
  - Not relevant

job_satisfaction
- type: rating_1_5
- scale: 1 = not satisfied, 5 = very satisfied

daily_stress_level
- type: rating_1_5
- scale: 1 = low, 5 = high

stress_affects_eating
- type: single_choice
- options:
  - Yes, strongly
  - Sometimes
  - Almost never
  - Not sure

difficult_eating_times
- type: multi_choice
- options:
  - Morning
  - Noon
  - Afternoon
  - Evening
  - Night
  - Weekends
  - No fixed time

workday_nutrition_barrier
- type: multi_choice
- options:
  - Lack of time
  - No prepared food
  - Food temptations
  - Emotional overload
  - I eat too late
  - I skip meals
  - I eat out
  - Other, please specify

---

# Section 6: Medical History and Risk Screening

medical_conditions
- type: single_choice
- options:
  - Yes
  - No
  - Not sure
  - Prefer not to answer

If medical_conditions is Yes or Not sure, open:
- medical_conditions_detail: text
- condition_start_date: text
- condition_treated: single_choice: Yes, No, Not sure
- condition_balanced: single_choice: Yes, No, Not sure

surgeries
- type: single_choice
- options: Yes, No

If surgeries is Yes, open table_input:
- surgery_type
- surgery_year
- surgery_reason
- current_effect_on_nutrition_digestion_movement_or_pain
- medical_instructions_to_consider

bariatric_surgery
- type: single_choice
- options: Yes, No

If bariatric_surgery is Yes, open:
- bariatric_type
- bariatric_year
- weight_change_since
- nutrition_limitations
- current_followup_status

hospitalizations
- type: single_choice
- options: Yes, No

If hospitalizations is Yes, open:
- hospitalization_reason
- hospitalization_year
- hospitalization_duration
- current_effect

fractures_accidents_injuries
- type: single_choice
- options: Yes, No

If fractures_accidents_injuries is Yes, open:
- injury_type: Accident, Fracture, Sports injury, Fall, Other
- body_area: Back, Neck, Knee, Hip, Shoulder, Arm, Ankle, Foot, Other
- injury_year
- current_pain: Yes, No, Sometimes
- movement_limitation: Yes, No, Sometimes
- forbidden_movements_or_exercises

chronic_pain_or_movement_limitation
- type: single_choice
- options: Yes, No, Sometimes

If Yes or Sometimes, open:
- pain_location
- pain_frequency
- what_worsens
- what_helps
- limits_exercise: Yes, No, Sometimes

psychological_or_psychiatric_care
- type: single_choice
- options:
  - Yes
  - No
  - In the past
  - Prefer not to answer

If Yes or In the past, open:
- effect_on_eating_sleep_mood_or_adherence

Eating disorder screening must be handled sensitively.

eating_disorder_history
- type: single_choice
- options:
  - Yes
  - No
  - I suspect so
  - In the past
  - Prefer not to answer

If Yes, I suspect so, or In the past, open:
- eating_disorder_detail
- currently_treated: Yes, No, Prefer not to answer
- known_triggers

Condition-specific questions:

diabetes_or_prediabetes
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- diabetes_type
- treatment
- known_hba1c
- known_glucose

high_blood_pressure
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- bp_treated: Yes, No, Not sure
- bp_medication
- bp_balanced: Yes, No, Not sure

heart_or_vascular_condition
- type: single_choice
- options: Yes, No

If Yes, open:
- heart_condition_detail
- exercise_restrictions
- doctor_clearance_needed: Yes, No, Not sure

kidney_or_liver_condition
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- condition_detail
- nutrition_restrictions

thyroid_issue
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- thyroid_type: Hypothyroidism, Hyperthyroidism, Thyroid surgery, Radioactive iodine, Other
- thyroid_medication
- thyroid_dose

autoimmune_condition
- type: single_choice
- options: Yes, No

If Yes, open:
- autoimmune_detail
- treatment
- nutrition_or_movement_effect

hormonal_issue
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- hormonal_issue_type: PCOS, Menopause, Prolactin, Other

additional_medical_info
- type: single_choice
- options: Yes, No

If Yes, open:
- additional_medical_info_detail

---

# Section 7: Medications, Supplements, Sensitivities, and Habits

regular_medications
- type: single_choice
- options: Yes, No, Sometimes

If Yes or Sometimes, open table_input:
- medication_name
- medication_reason: Diabetes, Blood pressure, Cholesterol, Thyroid, Hormones, Pain, Mood, Other
- medication_dose
- medication_frequency: Once daily, Twice daily, As needed, Weekly, Other
- treatment_duration: Less than 1 month, 1 to 6 months, More than 6 months, More than 1 year
- effect_on_appetite_weight_sleep_or_digestion: Yes, No, Not sure
- notes

as_needed_medications
- type: single_choice
- options: Yes, No, Sometimes

If Yes or Sometimes, open table_input:
- medication_name
- reason
- dose
- frequency

painkiller_use
- type: single_choice
- options:
  - No
  - Rarely
  - Once a week
  - Several times a week
  - Almost every day

If not No, open table_input:
- painkiller_name: Paracetamol, Dipyrone, Ibuprofen, Other
- dose
- frequency
- reason: Headaches, Menstrual pain, Back pain, Joint pain, Muscle pain, Other
- pain_limits_exercise: Yes, No
- notes

supplements
- type: single_choice
- options: Yes, No, Sometimes

If Yes or Sometimes, open table_input:
- supplement_name: Vitamin D, B12, Iron, Magnesium, Omega 3, Probiotic, Collagen, Multivitamin, Other
- dose
- frequency: Daily, Several times a week, As needed, Other
- duration: Less than 1 month, 1 to 6 months, More than 6 months, More than 1 year
- recommended_by: Physician, Dietitian, Naturopath, Self, Other
- notes

antibiotics_recent_months
- type: single_choice
- options: Yes, No, I do not remember

If Yes, open:
- antibiotic_when
- duration
- reason

drug_or_material_sensitivity
- type: single_choice
- options: Yes, No, Not sure

If Yes, open:
- sensitivity_to_what
- reaction_type

food_allergy_or_sensitivity
- type: single_choice
- options: Yes, No, Not sure

If Yes or Not sure, open:
- food_sensitivity_items: Milk, Gluten, Nuts, Eggs, Fish, Soy, Sesame, Seafood, Other
- reaction_type
- reaction_severity: Mild, Moderate, Severe, Not sure

smoking
- type: single_choice
- options: Yes, No, Sometimes, I quit

alcohol
- type: single_choice
- options: No, Rarely, Once a week, Several times a week

---

# Section 8: Weight-Loss and Blood Sugar Medications

weight_loss_or_blood_sugar_medication
- type: single_choice
- options:
  - Yes, currently
  - Used in the past
  - Considering starting
  - No
  - Prefer not to answer

If Yes, currently or Used in the past, open:

medication_type
- type: multi_choice
- options:
  - Ozempic
  - Wegovy
  - Mounjaro
  - Saxenda
  - Metformin
  - Other, please specify

medication_start_date
- type: text

medication_current_status
- type: single_choice
- options:
  - Currently using
  - Recently stopped
  - Stopped more than 3 months ago
  - Not sure

If recently stopped or stopped more than 3 months ago, open:
- stop_date_or_estimate
- reason_stopped
- appetite_change_after_stopping
- weight_change_after_stopping

medication_side_effects
- type: multi_choice
- options:
  - Nausea
  - Low appetite
  - Constipation
  - Diarrhea
  - Fatigue
  - Dizziness
  - None
  - Other, please specify

---

# Section 9: Female Health, Hormones, Pregnancies, and Births

current_menstrual_status
- type: single_choice
- options:
  - Active menstrual cycle
  - Irregular cycle
  - Perimenopause
  - Menopause
  - Post-menopause
  - Not relevant
  - Prefer not to answer

cycle_regular
- type: single_choice
- options:
  - Yes
  - No
  - Not relevant

pms_symptoms
- type: multi_choice
- options:
  - Increased appetite
  - Sweet cravings
  - Bloating
  - Abdominal pain
  - Headaches
  - Irritability
  - Low mood
  - Fatigue
  - None
  - Not relevant

hot_flashes
- type: single_choice
- options: Yes, No, Sometimes

ever_pregnant
- type: single_choice
- options:
  - Yes
  - No
  - Prefer not to answer

If ever_pregnant is Yes, open:

pregnancy_count
- type: single_choice
- options: 1, 2, 3, 4 or more, Prefer not to answer

births
- type: single_choice
- options: Yes, No, Prefer not to answer

If births is Yes, open:

birth_count
- type: single_choice
- options: 1, 2, 3, 4 or more, Prefer not to answer

pregnancies_without_birth
- type: single_choice
- options: Yes, No, Prefer not to answer

If pregnancies_without_birth is Yes, open:

pregnancy_without_birth_type
- type: multi_choice
- options:
  - Miscarriage
  - Elective termination
  - Chemical pregnancy
  - Stillbirth
  - Ectopic pregnancy
  - Prefer not to specify
  - Other, please specify

currently_pregnant
- type: single_choice
- options: Yes, No, Not sure

currently_breastfeeding
- type: single_choice
- options: Yes, No

planning_pregnancy
- type: single_choice
- options: Yes, No, Maybe, Prefer not to answer

fertility_treatments
- type: single_choice
- options: Yes, No, Prefer not to answer

female_health_notes
- type: text
- required: false

---

# Section 10: Sleep, Energy, and Stress

bedtime
- type: single_choice
- options:
  - Before 22:00
  - 22:00 to 23:00
  - 23:00 to midnight
  - After midnight
  - Highly variable

wake_time
- type: single_choice
- options:
  - Before 06:00
  - 06:00 to 07:00
  - 07:00 to 08:00
  - After 08:00
  - Variable

sleep_hours
- type: single_choice
- options:
  - Less than 5
  - 5 to 6
  - 6 to 7
  - 7 to 8
  - More than 8

morning_energy
- type: single_choice
- options:
  - Very tired
  - Tired
  - Reasonable
  - Energetic

night_wakings
- type: single_choice
- options:
  - No
  - Once
  - Several times
  - Almost every night

daily_energy_drop
- type: single_choice
- options: Yes, No, Sometimes

energy_drop_time
- type: multi_choice
- options:
  - Morning
  - Noon
  - Afternoon
  - Evening
  - After meals
  - No fixed time

sleep_quality
- type: rating_1_5
- scale: 1 = poor, 5 = excellent

general_stress
- type: rating_1_5
- scale: 1 = low, 5 = high

stress_effect
- type: multi_choice
- options:
  - I eat more
  - I do not eat
  - I look for sweets
  - I look for salty foods
  - It is hard to exercise
  - It is hard to sleep
  - It does not affect me
  - Other, please specify

---

# Section 11: Digestion

appetite
- type: single_choice
- options:
  - Low
  - Normal
  - High
  - Highly variable

bloating
- type: single_choice
- options:
  - No
  - Rarely
  - Several times a week
  - Almost every day

gas
- type: single_choice
- options:
  - No
  - Rarely
  - Several times a week
  - Almost every day

stomach_pain
- type: single_choice
- options:
  - No
  - Rarely
  - Several times a week
  - Almost every day

constipation
- type: single_choice
- options:
  - No
  - Sometimes
  - Often

diarrhea
- type: single_choice
- options:
  - No
  - Sometimes
  - Often

foods_that_feel_bad
- type: single_choice
- options: Yes, No, Not sure

If Yes or Not sure, open:

foods_that_feel_bad_items
- type: multi_choice
- options:
  - Dairy products
  - Gluten
  - Legumes
  - Certain vegetables
  - Certain fruits
  - Fried foods
  - Spicy foods
  - Sweets
  - Coffee
  - Other, please specify

laxative_use
- type: single_choice
- options:
  - No
  - Rarely
  - Sometimes
  - Regularly

snacking
- type: single_choice
- options:
  - No
  - Sometimes
  - Yes
  - Mostly in the evening
  - Mostly at work

digestion_worst_time
- type: multi_choice
- options:
  - Morning
  - After meals
  - Evening
  - During stress
  - Around menstrual cycle
  - No fixed time
  - Not relevant

---

# Section 12: Daily Eating Habits

meals_per_day
- type: single_choice
- options:
  - 1
  - 2
  - 3
  - 4
  - 5 or more
  - Not fixed

breakfast
- type: single_choice
- options: Yes, No, Sometimes

first_meal_time
- type: single_choice
- options:
  - Within 1 hour of waking
  - Late morning
  - Noon
  - Variable

regular_lunch
- type: single_choice
- options: Yes, No, Sometimes

regular_dinner
- type: single_choice
- options: Yes, No, Sometimes

hunger_peak
- type: multi_choice
- options:
  - Morning
  - Noon
  - Afternoon
  - Evening
  - Night

snacking_time
- type: multi_choice
- options:
  - Morning
  - Noon
  - Afternoon
  - Evening
  - Night
  - Weekend

snack_type
- type: multi_choice
- options:
  - Sweet
  - Salty
  - Bread or pastries
  - Fruit
  - Nuts
  - Snacks
  - Cheese
  - Other, please specify

emotional_eating
- type: single_choice
- options:
  - Yes
  - No
  - Sometimes
  - Not sure

screen_eating
- type: single_choice
- options: Yes, No, Sometimes

home_cooking
- type: single_choice
- options: Yes, No, Partly

food_prep_time
- type: single_choice
- options:
  - Up to 10 minutes
  - 10 to 20 minutes
  - 20 to 40 minutes
  - More than 40 minutes
  - No fixed time

eating_out_frequency
- type: single_choice
- options:
  - Almost never
  - 1 to 2 times a week
  - 3 to 4 times a week
  - Almost every day

not_willing_to_give_up
- type: multi_choice
- options:
  - Coffee
  - Bread
  - Sweets
  - Chocolate
  - Carbs
  - Wine
  - Cheese
  - Fruit
  - None
  - Other, please specify

menu_preference
- type: single_choice
- options:
  - Very precise menu
  - Menu with alternatives
  - Combination
  - Not sure

---

# Section 13: Food Quantity Style

willing_to_weigh_food
- type: single_choice
- options:
  - Yes, I have no problem weighing food
  - Maybe only at the beginning
  - No
  - I prefer quantity estimation
  - Not sure

preferred_quantity_format
- type: single_choice
- options:
  - Grams
  - Spoons and cups
  - Units
  - Hand-size or plate method
  - Combination

has_kitchen_scale
- type: single_choice
- options:
  - Yes
  - No
  - No, but I am willing to buy one
  - I am not interested

numbers_in_menu_effect
- type: single_choice
- options:
  - Helps me
  - Feels heavy or stressful
  - Depends
  - Not sure

precision_importance
- type: rating_1_5
- scale: 1 = very flexible, 5 = very precise

---

# Section 14: Food Preferences for Menu Building

For each food group, ask:
"Select foods you like or are willing to include in your menu. Select all that apply."

Each field type: multi_choice with "Other, please specify" where relevant.

carbs_breads
- options: Whole wheat bread, White bread, Pita, Bread roll, Baguette, Crackers, Rice cakes, Oats, Breakfast cereal, Granola, Other, Not interested

cooked_carbs
- options: Rice, Pasta, Buckwheat, Israeli couscous, Couscous, Potato, Sweet potato, Corn, Quinoa, Other, Not interested

eggs
- options: Hard-boiled egg, Omelet, Fried egg, Shakshuka, I do not eat eggs

chicken_meat
- options: Chicken breast, Boneless chicken thighs, Chicken drumsticks, Turkey, Beef, Ground meat, Schnitzel, I do not eat meat, Other

fish
- options: Tuna, Salmon, Sardines, Sea bass, Sea bream, Tilapia, I do not eat fish, Other

plant_protein
- options: Tofu, Seitan, Lentils, Chickpeas, Beans, Peas, Edamame, I do not connect with plant protein, Other

dairy
- options: Cottage cheese, White cheese, Yogurt, Bio yogurt, Yellow cheese, Bulgarian cheese, Goat cheese, Milk, I do not eat dairy, Other

dairy_alternatives
- options: Soy milk, Oat milk, Soy yogurt, Soy dessert, I do not use dairy alternatives, Other

fresh_vegetables
- options: Tomato, Cucumber, Bell pepper, Carrot, Lettuce, Leafy greens, Cabbage, Green onion, Beetroot, Radish, Other

cooked_vegetables
- options: Broccoli, Cauliflower, Zucchini, Eggplant, Mushrooms, Green beans, Pumpkin, Butternut squash, Kohlrabi, Fennel, Other

fruit
- options: Apple, Pear, Banana, Kiwi, Watermelon, Melon, Grapes, Strawberry, Plum, Nectarine, Citrus fruit, Mango, Other, I do not eat fruit

dried_fruit
- options: Date, Dried plum, Dried fig, Raisins, I do not eat dried fruit, Other

healthy_fats
- options: Olive oil, Avocado, Tahini, Walnuts, Almonds, Cashews, Pecans, Chia seeds, Flax seeds, Sesame, Other

sauces_extras
- options: Mustard, Soy sauce, Teriyaki, Chili sauce, Honey, Olives, Mayonnaise, Balsamic vinegar, Other, I do not use sauces

hard_to_reduce_sweets
- options: Chocolate, Cakes, Cookies, Ice cream, Candy, Wafers, Pastries, No difficulty, Other

regular_snacks
- options: Peanut puffs, Chips, Savory snacks, Crackers, Pretzels, Roasted nuts or seeds, Almost never, Other

fast_food
- options: Pizza, Bourekas, Falafel, Shawarma, Toast sandwich, Jachnun, Malawach, Schnitzel and fries, Almost never, Other

water_amount
- type: single_choice
- options: Less than 3 cups, 3 to 5 cups, 6 to 8 cups, More than 8 cups, Not sure

coffee_amount
- type: single_choice
- options: I do not drink coffee, 1 cup, 2 cups, 3 cups, 4 or more cups

other_drinks
- type: multi_choice
- options: Tea, Cocoa drink, Diet drinks, Cola or carbonated soft drinks, Soda water, Juice, Smoothies, Alcohol, Other

---

# Section 15: Foods That Do Not Fit

food_dislikes
- type: multi_choice
- options:
  - Bread
  - Rice
  - Pasta
  - Eggs
  - Chicken
  - Fish
  - Dairy products
  - Legumes
  - Certain vegetables
  - Certain fruits
  - Tofu
  - Other, please specify

foods_causing_discomfort
- type: multi_choice
- options:
  - Milk
  - Cheese
  - Gluten
  - Legumes
  - Cruciferous vegetables
  - Spicy food
  - Fried food
  - Coffee
  - Certain fruits
  - Other, please specify

foods_to_reduce_not_remove
- type: multi_choice
- options:
  - Sweets
  - Bread
  - Carbs
  - Cheese
  - Coffee
  - Alcohol
  - Snacks
  - Other, please specify

nutrition_limitations
- type: multi_choice
- options:
  - Vegetarian
  - Vegan
  - Gluten-free
  - Dairy-free
  - Kosher
  - Low-carb
  - Does not eat meat
  - None
  - Other, please specify

---

# Section 16: Exercise, Studio, Pilates, and Swimming

current_exercise
- type: single_choice
- options: Yes, No, Sometimes

exercise_types
- type: multi_choice
- options:
  - Pilates
  - Walking
  - Running
  - Swimming
  - Gym
  - Yoga
  - Strength training
  - Studio classes
  - Home workouts
  - Dance
  - Cycling
  - No exercise
  - Other, please specify

exercise_frequency
- type: single_choice
- options:
  - I do not exercise
  - Once a week
  - Twice a week
  - 3 times a week
  - 4 or more times a week

currently_swimming
- type: single_choice
- options: Yes, No, Sometimes, In the past

If currently_swimming is Yes or Sometimes, open:

swimming_frequency
- type: single_choice
- options:
  - Once a week
  - Twice a week
  - 3 or more times a week
  - Not fixed

wants_swimming
- type: single_choice
- options: Yes, No, Maybe

currently_pilates
- type: single_choice
- options: Yes, No, In the past

realistic_weekly_exercise
- type: single_choice
- options:
  - Once a week
  - Twice a week
  - 3 times a week
  - 4 or more times a week
  - Not sure

wants_studio_training
- type: single_choice
- options: Yes, No, Maybe

wants_pilates
- type: single_choice
- options: Yes, No, Maybe

home_workout_willingness
- type: single_choice
- options:
  - Yes
  - No
  - Maybe
  - Depends on length

home_video_length
- type: single_choice
- options:
  - Up to 5 minutes
  - 5 to 10 minutes
  - 10 to 20 minutes
  - More than 20 minutes

exercise_barriers
- type: multi_choice
- options:
  - Time
  - Pain
  - Fatigue
  - Lack of motivation
  - Lack of confidence
  - Workload
  - Medical limitation
  - No limitation
  - Other, please specify

---

# Section 17: Learning, Attention, Numeric Calculation, and Support Style

learning_or_execution_difficulty
- type: single_choice
- label: Do you have a learning difficulty or difficulty with reading, writing, organizing information, numeric calculation, or following written instructions?
- options:
  - Yes
  - No
  - I suspect so
  - Sometimes
  - Prefer not to answer

If Yes, I suspect so, or Sometimes, open:

difficulty_area
- type: multi_choice
- options:
  - Reading
  - Writing
  - Organizing information
  - Numeric calculation
  - Memory
  - Concentration
  - Following instructions
  - Time management
  - Other, please specify

difficulty_with_grams_numbers
- type: single_choice
- options: Yes, No, Sometimes

preferred_instruction_format
- type: multi_choice
- options:
  - Short text
  - Simple table
  - Pictures
  - Units
  - Spoons and cups
  - Grams
  - Short video
  - Reminders
  - Personal conversation
  - Other, please specify

long_lists_difficult
- type: single_choice
- options: Yes, No, Sometimes

reminders_help
- type: single_choice
- options:
  - Yes, very much
  - Sometimes
  - No
  - They stress me out

best_task_style
- type: single_choice
- options:
  - One daily task
  - Clear daily plan
  - Weekly menu
  - Flexible choices with boundaries

support_style
- type: single_choice
- options:
  - Close follow-up
  - Independence
  - Combination

what_helps_reset
- type: multi_choice
- options:
  - Encouragement
  - Reminder
  - Conversation
  - Small task
  - Replanning
  - Not sure
  - Other, please specify

---

# Section 18: Final Summary and Track Interest

biggest_challenge
- type: multi_choice
- options:
  - Consistency
  - Hunger
  - Sweets
  - Weekends
  - Stress
  - Cooking
  - Exercise
  - Time
  - Support at home
  - Other, please specify

what_will_help_success
- type: multi_choice
- options:
  - Clear menu
  - Alternatives
  - Follow-up
  - Weigh-ins
  - Community
  - Exercise
  - Reminders
  - Personal meetings
  - Lectures
  - Other, please specify

track_interest
- type: single_choice
- options:
  - Digital nutrition and tracking only
  - Nutrition and group support
  - Nutrition and studio movement
  - Nutrition and Pilates
  - Personal support
  - Not sure

additional_notes
- type: text
- required: false

---

# AI Output Requirements

After form completion, generate an internal AI summary with these fields:

client_summary
main_goal
motivation_level
risk_status: Green, Yellow, Red
medical_flags
medications_summary
supplements_summary
weight_loss_medication_summary
pain_or_movement_limitations
pregnancy_hormonal_notes
work_lifestyle_pattern
stress_score
eating_pattern
main_failure_window
digestion_flags
food_likes
food_dislikes
foods_to_avoid
quantity_preference
menu_complexity_level
exercise_readiness
recommended_movement_plan
learning_support_needs
dropout_risk
persona_type
recommended_track
recommended_content_topics
staff_followup_needed

## Persona Classification Options
- The Experienced and Frustrated Client
- Menopause or Hormonal Change Client
- Busy Mother
- Athletic but Stuck Client
- Other or Mixed Persona

## Recommended Track Options
- Digital Follow Up
- Nutrition Accountability
- Nutrition and Studio Movement
- Nutrition and Pilates Method
- Premium Personal Track
- VIP 90 Day Transformation

---

# Menu Output Structure

The AI must generate a draft menu structure only after risk screening. The draft must be reviewed and approved by the professional team before sending to the client.

Required output fields:

menu_goal
daily_meal_count
recommended_meal_times
breakfast_options
lunch_options
dinner_options
snack_options
sweet_alternative
water_goal
coffee_guidance
shopping_list
foods_to_include
foods_to_reduce
foods_to_avoid
workday_guidelines
weekend_guidelines
eating_out_guidelines
weekly_movement_plan
one_weekly_behavior_task
quantity_format_used

---

# Risk Logic

1. If eating_disorder_history is Yes, I suspect so, or In the past, set risk_status to Red or Yellow and require professional review before generating or sending any menu.
2. If currently_pregnant is Yes or currently_breastfeeding is Yes, set risk_status to Yellow and require professional review.
3. If diabetes, kidney condition, liver condition, heart condition, bariatric surgery, or significant medication use exists, set risk_status to Yellow or Red and require professional review.
4. If GLP-1, Ozempic, Wegovy, Mounjaro, Saxenda, Metformin, or similar medication is currently used or recently stopped, require medication-specific nutrition review.
5. If chronic pain or movement limitation exists, adapt exercise recommendations and require movement review.
6. If the client is unwilling to weigh food, generate quantity estimates using cups, spoons, units, hand-size, or plate method.
7. If numeric calculation difficulty exists, avoid gram-heavy menus and use simplified quantities.
8. If stress level is 4 or 5, include stress-eating support.
9. If work pattern is mostly sitting, include micro-movement recommendations.
10. If appetite or snacking peaks in the evening, include a planned afternoon snack and dinner strategy.
11. If digestion sensitivity exists, avoid foods marked as causing discomfort and recommend professional review if symptoms are frequent.
12. No Red status client should receive automated nutrition output without human approval.

---

# Admin Requirements

1. Admin can view every completed questionnaire.
2. Admin can edit answers.
3. Admin can add staff-only body measurements.
4. Admin can generate AI summary.
5. Admin can approve, edit, or reject AI summary before sending to client.
6. Admin can approve, edit, or reject AI menu draft before sending to client.
7. Admin can export client data as CSV.
8. Admin can filter clients by risk status, recommended track, goal, persona, source, engagement status, and dropout risk.
9. Store consent records with timestamp.
10. Store every menu version with timestamp and approver name.
11. Do not overwrite measurements. Add new measurement records over time.
12. Every record must be connected to one unique Client ID.
13. Ensure privacy, access control, and secure storage for sensitive health data.
14. Do not send sensitive medical details through unsecured messaging.
15. AI is decision support only. It does not replace professional judgment.
