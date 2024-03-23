import { ManualOrderFile } from 'src/entities/Manual_order_files';

export class CreateManualOrder {
  manual_order_title: string;
  manual_order_comments: string;
  manual_order_files: ManualOrderFile[];
}
