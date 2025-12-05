export interface DealList {
  paymentCode: string;
  mchtCode: string;
  amount: number;
  currency: string;
  status: string;
  payType: string;
  paymentAt: string;
}

export interface PaymentStatus {
  code: string;
  description: string;
}

export interface PaymentType {
  type: string;
  description: string;
}
export interface DealListItemProps {
  payment: DealList;
  statusList: PaymentStatus[];
  //   payType: PaymentType[];
}

export interface SmallCardProps {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

export interface mchStatus {
  code: string;
  description: string;
}

export interface mchStatusProps {
  merchants: SmallCardProps;
  statusList: mchStatus[];
  //   payType: PaymentType[];
  onClick?: () => void;
}

export interface merchantDetails {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export interface PaymentData {
  paymentAt: string;
  amount: string;
  payType: string;
}
