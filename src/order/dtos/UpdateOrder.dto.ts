import { AcademicLevel } from "src/entities/Academic-level";
import { OrderCategory } from "src/entities/Order-category";
import { OrderType } from "src/entities/Order-type";
import { Pages } from "src/entities/Pages";
import { Reference } from "src/entities/References";
import { Style } from "src/entities/Style";
import { Subject } from "src/entities/Subject";
import { Urgency } from "src/entities/Urgency";

  export class UpdateOrder {
    order_type?: OrderType
    order_category?: OrderCategory;
    academic_level?: AcademicLevel;
    order_deadline?: Urgency;
    order_style?: Style;
    order_subject?: Subject;
    order_topic?: string;
    phone_number?: string;
    order_references?: Reference;
    order_pages?: Pages;
    order_language?: string;
    order_status?: string;
    order_spacing?: string;
    order_instructions?: string;
    order_amount?: string;
    order_additional_information?: string;
  }
  