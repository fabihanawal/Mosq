export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  category: string;
  formType: 'Product';
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: string; // JSON string of items
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  formType: 'Order';
}

export interface Donation {
  id?: string;
  name: string;
  phone: string;
  amount: number;
  type: 'Zakat' | 'Sadaqah' | 'General' | 'Other';
  date: string;
}

export interface HelpApplication {
  id?: string;
  name: string;
  phone: string;
  projectType: 'Education' | 'Health' | 'Food' | 'Business' | 'Other';
  description: string;
  date: string;
}

export interface DashboardStats {
  totalDonations: number;
  totalBeneficiaries: number;
  activeProjects: number;
  zakatCollected: number;
}
