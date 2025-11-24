import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wct';

const securityFlow = [
  {
    step: 1,
    title: 'Site Assessment',
    description: 'Comprehensive evaluation of security requirements and infrastructure needs'
  },
  {
    step: 2,
    title: 'System Design',
    description: "Custom solution design tailored to your facility's specific requirements"
  },
  {
    step: 3,
    title: 'Professional Installation',
    description: 'Expert installation by certified technicians ensuring optimal performance'
  },
  {
    step: 4,
    title: 'Testing & Support',
    description: 'Thorough testing and ongoing maintenance support for system reliability'
  }
];

async function addSecurityFlow() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('homepages');
    
    const result = await collection.updateOne(
      {},
      { $set: { 'lowCurrentSection.securityFlow': securityFlow } },
      { upsert: false }
    );
    
    console.log('✓ Security flow updated successfully');
    console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addSecurityFlow();
