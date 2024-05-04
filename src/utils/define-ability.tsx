import {
  AbilityBuilder,
  createMongoAbility,
} from '@casl/ability';

export const ability = createMongoAbility();

const {can, rules} = new AbilityBuilder(createMongoAbility);
can('read', 'all');

ability.update(rules);
