import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';
import { DecodedToken } from '../../models/token.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const decodedToken: DecodedToken | null = this.authService.getDecodedToken();
    if (decodedToken) {
      const userId = decodedToken.sub;
      this.userService.getUser(userId).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }
  }
}
