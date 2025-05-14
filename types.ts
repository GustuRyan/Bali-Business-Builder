import { number } from "zod";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export enum Provider {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  LOCAL = "LOCAL",
}
export interface AuthUser {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_password_settled: number;
  profile_picture: string;
  mobile_number?: string;
  country?: string;
  city?: string;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
  is_setup?: 0 | 1;
}

export interface AuthLogin {
  email: string | undefined;
  password: string | undefined;
  remember_me?: boolean | number;
}

export interface AuthRegister {
  first_name: string;
  last_name: string;
  email: string;
  phoner: string;
  password: string;
  comfirm_password: string;
}

export interface AuthCredential {
  token: AuthToken;
  provider: AuthProvider;
  role: AuthRole;
}

interface ErrorObject {
  [key: string]: string[];
}

export interface ResponseErrorObject {
  message: string;
  errors?: ErrorObject;
}

/**
 * @see https://vee-validate.logaretm.com/v4/tutorials/dynamic-form-generator/
 */
interface FormDynamicItem {
  label?: string;
  name: string;
  as: string;
  rules?: any;
  class?: string;
}
export interface FormDynamic {
  fields: FormDynamicItem[];
}

export type AuthToken = string;
export type AuthRole = Role;
export type AuthProvider = Provider;
export type IsLogin = boolean;

export interface Root {
  data: Product[];
  links: Links;
  meta: Meta;
}

export interface Variants {
  id: number;
  product_id: number;
  name: string;
  price: string;
  usd_price: string;
  express_price: string;
  express_usd_price: string;
  express_estimated_day: number;
  estimated_day: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  full_description: string;
  de_description: string;
  de_full_description: string;
  hu_description: string;
  hu_full_description: string;
  price: string;
  usd_price: string;
  weight: any;
  height: any;
  width: any;
  lenght: any;
  is_bundle: any;
  is_saleable: number;
  is_variant: any;
  is_extend: number;
  is_express: number;
  express_price: string;
  express_usd_price: string;
  express_estimated_day: string;
  estimated_day: number;
  stock: any;
  image: any;
  icon: any;
  created_at: string;
  updated_at: string;
  variants: Variants[];
  questions?: FAQ[];
  total_order?: number;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: any;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface GeneralResponse<T> {
  status: string;
  data: T;
}

export interface IntroForm {
  product_id: string | number | undefined;
  variant_id: string | number | undefined;
  total_apply: number;
  validity_period: string | undefined;
  date_arriving_in_indonesia?: string | undefined;
  visa_validation_end_at?: string | undefined;
  is_extend: number | string | undefined;
  is_express_mode: boolean;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  is_taking_for_self: boolean;
  mobile_number: string | undefined;
  pickup_address?: string | undefined;
  delivery_address?: string | undefined;
  is_registered?: boolean;
}

export interface FormUser {
  id?: string | number | undefined;
  uuid?: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  citizenship: string | undefined;
  marital_status: string | undefined;
  date_of_birth: string | undefined;
  place_of_birth: string | undefined;
  mobile_phone: string | undefined;
  is_mobile_phone_has_whatsapp: number;
  is_extend?: boolean | number;
  email: string | undefined;
  passport_no: string | undefined;
  passport_date_of_issued: string | undefined;
  passport_place_of_issued: string | undefined;
  passport_date_of_expiration: string | undefined;
  street_address: string | undefined;
  street_address2?: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  zip: string | undefined;
  local_street_address: string | undefined;
  local_street_address2?: string | undefined;
  local_city: string | undefined;
  local_state: string | undefined;
  local_country: string | undefined;
  local_zip: string | undefined;
  passport_detail_image: string | undefined | File;
  passport_cover_image: string | undefined | File;
  selfie_image: string | undefined | File;
  return_ticket_image: string | undefined | File;
  onward_ticket_image: string | undefined | File;
  evisa_on_arrival_image: string | undefined | File;
  user_uuid?: string | undefined;
  status?: "submitted" | "completed" | "incompleted";
  incomplete_message?: string;
}

export interface PERSON_FORM_LIST {
  id: number;
  uuid: string;
  name: string;
  passport_no: string;
  citizenship: string;
  created_at: string;
}

export interface FormUserRes {
  id?: string | number | undefined;
  uuid?: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  citizenship: string | undefined;
  marital_status: string | undefined;
  date_of_birth: string | undefined;
  place_of_birth: string | undefined;
  mobile_phone: string | undefined;
  is_mobile_phone_has_whatsapp: number;
  is_extend?: boolean | number;
  email: string | undefined;
  passport_no: string | undefined;
  passport_date_of_issued: string | undefined;
  passport_place_of_issued: string | undefined;
  passport_date_of_expiration: string | undefined;
  street_address: string | undefined;
  street_address2?: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  zip: string | undefined;
  local_street_address: string | undefined;
  local_street_address2?: string | undefined;
  local_city: string | undefined;
  local_state: string | undefined;
  local_country: string | undefined;
  local_zip: string | undefined;
  passport_detail_image?: string;
  passport_cover_image?: string;
  selfie_image?: string;
  return_ticket_image?: string;
  onward_ticket_image?: string;
  evisa_on_arrival_image?: string;
  user_uuid?: string | undefined;
}

export interface ProductOrder {
  id: string | number;
  variant_id: string | number;
  quantity: number | string;
}

export interface personForm {
  uuid: string | undefined;
}

export interface UserOrder {
  products: ProductOrder[];
  person_forms: personForm[];
  user_uuid?: string | undefined;
  is_for_other_person?: number | boolean | undefined;
}

export interface payment {
  payment_url: string;
}

interface LinkAPI {
  url: string | null;
  label: string;
  active: boolean;
}

interface MetaAPI {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface LinksAPI {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Thumbnail {
  id: number;
  name: string;
  image: string;
  created_at: string;
}

export interface ProductOrders {
  id: number;
  uuid: string;
  grand_total_purchased: string;
  status: string;
  other_products: number;
  product_thumbnail: Thumbnail;
  user: AuthUser;
  created_at: string;
  updated_at: string;
}

export interface ResponseData<T> {
  data: T;
  links: LinksAPI;
  meta: MetaAPI;
}

export interface PaymentOrder {
  id: number;
  order_id: number;
  invoice_id: string;
  payment_method: string | null;
  payment_channel: string | null;
  paid_at: string | null;
  status: string;
  is_refunded: number;
  total_purchased: string;
  url: string;
  expired_at?: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Detail {
  id: number;
  name: string;
  product_id: number;
  product_slug: string;
  variant_id: number;
  variant_name: string;
  description: string;
  quantity: number;
  price: string | number;
  usd_price: string | number;
  total_price: string | number;
  express_price: string | number;
  express_usd_price: string | number;
  image: string;
  created_at: string;
}

export interface OrderDetail {
  id: number;
  uuid: string;
  total_purchased: string;
  promo_amount: string;
  grand_total_purchased: string;
  payment_url: string;
  payment_status: string;
  status: string;
  payout?: string;
  person_forms: FormUser[];
  payment: PaymentOrder;
  created_at: string;
  updated_at: string;
  details: Detail[];
  user?: AuthUser;
  arrive_at?: string;
  visa_validation_end_at?: string;
  is_for_other_person?: 0 | 1;
  pickup_address?: string;
  deliver_address?: string;
  estimated_day_at: string;
}

export interface Promo {
  id?: number;
  uuid?: string;
  code: string | undefined;
  description?: string | undefined;
  type: string | undefined;
  duration: string | undefined;
  amount: number | undefined;
  amount_usd?: number | undefined;
  is_active: number;
  is_new_user_promo: number | undefined;
  start_new_user_promo_at?: string | undefined;
  total_order?: number;
  start_at: string;
  expired_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  id?: number | undefined;
  uuid?: string | undefined;
  question: string | undefined;
  answer: string | undefined;
}

export interface ORDER_COUNT {
  total_all: number;
  total_failed: number;
  total_unpaid: number;
  total_review: number;
  total_success: number;
  total_rejected: number;
  total_complete: number;
}

export interface ORDER_COUNT_USER {
  total_failed: number;
  total_unpaid: number;
  total_review: number;
  total_success: number;
  total_rejected: number;
  total_complete: number;
}

export interface DASHBOARD_ADMIN {
  total_revenue: number;
  total_order: number;
  total_pending_order: number;
  list_pending_order: ProductOrders[];
}

export interface Contact {
  id: number | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  message: string | undefined;
  is_replied: 0 | 1;
  created_at: string | undefined;
}

export interface AuthForm {
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  mobile_number: string | undefined;
}
