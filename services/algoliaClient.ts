import { liteClient } from 'algoliasearch/lite';

// Credentials provided by the user
const APP_ID = '88G4AVERCC';
const SEARCH_API_KEY = '33b0b484f534b2ae2dac948d588345a6';
export const INDEX_NAME = 'algolia_unified';

export const searchClient = liteClient(APP_ID, SEARCH_API_KEY);