import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void { }

    irUsuario( id: string ) {
        console.log("NavbarComponent -> irUsuario -> id", id)
        if (!id) {
            return ;
        }

        this.router.navigate([ '/usuario', id ]);
    }
}
