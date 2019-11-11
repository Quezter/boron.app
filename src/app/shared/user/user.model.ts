export class User {
    name: string;
    password: string;

    hasUsername() {
        return this.name !== '';
    }
}
