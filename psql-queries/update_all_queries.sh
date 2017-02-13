echo '--> SKILL_NAMES'
psql westplate -f enum/skill_name.psql

echo ''
echo ''

echo '--> USERBASE'
psql westplate -f entity/userbase.psql
echo '--> CAMPAIGN'
psql westplate -f entity/campaign.psql
echo '--> CHARACTER'
psql westplate -f entity/character.psql
echo '--> CHARACTER_CLASS'
psql westplate -f entity/character_class.psql
echo '--> CLASS_SKILL_LIST'
psql westplate -f entity/class_skill_list.psql

echo ''
echo ''

echo '--> POPULATE DATABASE FOR TESTING'
psql westplate -f populate/populate-testing.psql
