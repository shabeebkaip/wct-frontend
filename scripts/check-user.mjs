import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function checkUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const email = 'wct@wecaretech.com';
    const password = 'weCareTech@2005#';

    // Check if user exists
    const user = await User.findOne({ email });

    if (user) {
      console.log('✓ User found in database:');
      console.log('  Email:', user.email);
      console.log('  Name:', user.name);
      console.log('  Role:', user.role);
      console.log('  Is Active:', user.isActive);
      console.log('  Created:', user.createdAt);
      console.log('  Password Hash:', user.password.substring(0, 30) + '...');
      
      // Test password
      console.log('\nTesting password...');
      const isValid = await user.comparePassword(password);
      console.log('  Password Valid:', isValid ? '✓ YES' : '✗ NO');
      
      if (!isValid) {
        console.log('\n⚠️  Password does not match!');
        console.log('  This suggests the password was not hashed correctly or is different.');
      }
    } else {
      console.log('✗ User NOT found in database');
      console.log('\nYou need to create the user by visiting:');
      console.log('  http://localhost:3000/init-admin.html');
    }

    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkUser();
