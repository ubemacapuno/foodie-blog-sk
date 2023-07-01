// Theme
export type Status = 'info' | 'warning' | 'error' | 'success';
export type Theme = 'primary' | 'secondary';
export type Accent = Status | Text | Theme;

//Font size
export type FontSize = 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';

// Icons (from Material UI)
export type IconName =
	| 'close'
	| 'warning'
	| 'edit'
	| 'edit_note'
	| 'delete'
	| 'add'
	| 'logout'
	| 'login'
	| 'help'
	| 'info'
	| 'science'
	| 'menu_book'
	| 'business'
	| 'home'
	| 'account_circle'
	| 'menu'
	| 'movie'
	| 'arrow_back'
	| 'groups'
	| 'group'
	| 'construction'
	| 'card_membership'
	| 'precision_manufacturing'
	| 'arrow_drop_down'
	| 'check_circle'
	| 'search'
	| 'view_kanban'
	| 'bug_report'
	| 'table_rows'
	| 'table_chart'
	| 'description'
	| 'content_copy'
	| 'open_in_new'
	| 'library_add'
	| 'archive'
	| 'done'
	| 'label'
	| 'person'
	| 'push_pin'
	| 'more_vert'
	| 'sort'
	| 'arrow_upward'
	| 'arrow_downward'
	| 'unfold_more'
	| 'filter_list'
	| 'place_item'
	| 'outgoing_mail'
	| 'dark_mode'
	| 'light_mode';
