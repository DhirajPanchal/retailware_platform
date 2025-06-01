export interface MdlChangeEvent {
  id?: number;
  region?: string;
  site?: string;
  industry?: string;
  method?: string;

  customer_id?: number;
  customer_name?: string;
  customer_legal_name?: string;

  gid?: number;
  grid?: number;
  default_date?: Date;
  resolution_date?: Date;

  grp_default_reason_desc?: string;
  grp_resolution_status_desc?: string;

  approver_name?: string;
  reviewer_name?: string;
  viewer_name?: string;

  approver_comments?: string;
  reviewer_comments?: string;
  viewer_comments?: string;

  change_type?: string;

  initial_date?: Date;

  date_loaded?: Date;
  file_loaded?: string;
  open_rec?: string;
}
