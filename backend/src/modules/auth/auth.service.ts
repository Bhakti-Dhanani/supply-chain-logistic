import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/common/enums/roles.enum';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: Partial<User> }> {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: user.id, email: user.email, username: user.username, roles: user.roles } };
  }

  async register(email: string, username: string, password: string, roles: Role[]): Promise<{ message: string }> {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, username, password: hashedPassword, roles });
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }
}
