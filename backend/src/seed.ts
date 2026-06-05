import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { Lead } from './models/Lead';

dotenv.config();

const sampleLeads = [
  { name: 'Alice Johnson', email: 'alice@techcorp.com', phoneNumber: '+1-555-0101', companyName: 'TechCorp Inc.', leadStatus: 'New', notes: 'Interested in enterprise plan', createdDate: new Date('2024-01-15') },
  { name: 'Bob Martinez', email: 'bob@designstudio.io', phoneNumber: '+1-555-0102', companyName: 'Design Studio IO', leadStatus: 'Contacted', notes: 'Requested demo call', createdDate: new Date('2024-01-18') },
  { name: 'Carol White', email: 'carol@globalventures.com', phoneNumber: '+1-555-0103', companyName: 'Global Ventures', leadStatus: 'Qualified', notes: 'Budget approved for Q2', createdDate: new Date('2024-01-20') },
  { name: 'David Kim', email: 'david@nextstartup.co', phoneNumber: '+1-555-0104', companyName: 'Next Startup Co', leadStatus: 'Converted', notes: 'Signed 12-month contract', createdDate: new Date('2024-01-22') },
  { name: 'Emily Chen', email: 'emily@financeplus.com', phoneNumber: '+1-555-0105', companyName: 'FinancePlus LLC', leadStatus: 'Lost', notes: 'Went with competitor', createdDate: new Date('2024-01-25') },
  { name: 'Frank Rivera', email: 'frank@mediaworks.net', phoneNumber: '+1-555-0106', companyName: 'Media Works Net', leadStatus: 'New', notes: 'Found us via LinkedIn', createdDate: new Date('2024-02-01') },
  { name: 'Grace Lee', email: 'grace@healthtech.io', phoneNumber: '+1-555-0107', companyName: 'HealthTech Solutions', leadStatus: 'Contacted', notes: 'Scheduled follow-up for next week', createdDate: new Date('2024-02-05') },
  { name: 'Henry Park', email: 'henry@retailchain.com', phoneNumber: '+1-555-0108', companyName: 'Retail Chain Group', leadStatus: 'Qualified', notes: 'Needs custom integration', createdDate: new Date('2024-02-08') },
  { name: 'Isabel Torres', email: 'isabel@cloudsys.io', phoneNumber: '+1-555-0109', companyName: 'CloudSys IO', leadStatus: 'New', notes: 'Trial request submitted', createdDate: new Date('2024-02-10') },
  { name: 'James Wilson', email: 'james@autotech.co', phoneNumber: '+1-555-0110', companyName: 'AutoTech Solutions', leadStatus: 'Converted', notes: 'Upgraded to premium tier', createdDate: new Date('2024-02-12') },
  { name: 'Karen Adams', email: 'karen@ecomhub.com', phoneNumber: '+1-555-0111', companyName: 'EcomHub Platform', leadStatus: 'Contacted', notes: 'Reviewing proposal', createdDate: new Date('2024-02-15') },
  { name: 'Liam Brown', email: 'liam@startuplab.io', phoneNumber: '+1-555-0112', companyName: 'Startup Lab Inc', leadStatus: 'Lost', notes: 'Budget constraints', createdDate: new Date('2024-02-18') },
  { name: 'Mia Nguyen', email: 'mia@creativeco.com', phoneNumber: '+1-555-0113', companyName: 'Creative Co Studio', leadStatus: 'New', notes: 'Referral from existing client', createdDate: new Date('2024-02-20') },
  { name: 'Noah Clark', email: 'noah@logisticspro.com', phoneNumber: '+1-555-0114', companyName: 'Logistics Pro Corp', leadStatus: 'Qualified', notes: 'Ready to move forward', createdDate: new Date('2024-02-22') },
  { name: 'Olivia Scott', email: 'olivia@edtech.io', phoneNumber: '+1-555-0115', companyName: 'EdTech Innovations', leadStatus: 'Contacted', notes: 'Interested in team plan', createdDate: new Date('2024-02-25') },
  { name: 'Paul Harris', email: 'paul@manufacturing.com', phoneNumber: '+1-555-0116', companyName: 'Harris Manufacturing', leadStatus: 'New', notes: 'Visited our booth at expo', createdDate: new Date('2024-03-01') },
  { name: 'Quinn Young', email: 'quinn@biotech.co', phoneNumber: '+1-555-0117', companyName: 'BioTech Research Inc', leadStatus: 'Converted', notes: 'Long-term partnership deal', createdDate: new Date('2024-03-05') },
  { name: 'Rachel Green', email: 'rachel@consulting.io', phoneNumber: '+1-555-0118', companyName: 'Green Consulting Group', leadStatus: 'Lost', notes: 'Decided to build in-house', createdDate: new Date('2024-03-08') },
  { name: 'Samuel Davis', email: 'samuel@proptech.com', phoneNumber: '+1-555-0119', companyName: 'PropTech Ventures', leadStatus: 'Qualified', notes: 'High priority account', createdDate: new Date('2024-03-10') },
  { name: 'Tina Moore', email: 'tina@fashionbrand.io', phoneNumber: '+1-555-0120', companyName: 'Fashion Brand Co', leadStatus: 'Contacted', notes: 'Exploring options for Q3', createdDate: new Date('2024-03-12') },
];

async function seed() {
  await connectDB();
  await Lead.deleteMany({});
  await Lead.insertMany(sampleLeads);
  console.log(`Seeded ${sampleLeads.length} leads successfully`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
