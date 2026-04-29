import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Divya Patel",
            "email": "divya@gmail.com",
            "role": "INTERN",
            "password": "123456"
        },
        {
            "id": 2,
            "name": "John Doe",
            "email": "john@gmail.com",
            "role": "ENGINEER",
            "password": "123456"
        },
        {
            "id": 3,
            "name": "Jane Smith",
            "email": "jane@gmail.com",
            "role": "ADMIN",
            "password": "123456"
        },
        {
            "id": 4,
            "name": "Alice Johnson",
            "email": "alice@gmail.com",
            "role": "MANAGER",
            "password": "123456"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new
                NotFoundException('User Role not found');
            return rolesArray;
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: (usersByHighestId[0]?.id || 0) + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto };
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
