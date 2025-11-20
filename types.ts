export interface BookRecord {
  objectID: string;
  id: string;
  book_title: string;
  part_number: number;
  page_number: number;
  text_content: string;
  part_sequence: number;
  is_split: boolean;
}

export interface SearchState {
  query: string;
  page: number;
}