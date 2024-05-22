<template>
    <nav class="navbar navbar-expand-lg fixed-top custom-navbar">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="navbar-left d-flex align-items-center">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <i class="fas fa-graduation-cap mr-2"></i>RMUTI
                </a>
            </div>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <router-link to="/" class="text-decoration-none">
                        <li class="nav-item active">
                            <a class="nav-link fw-bold" href="#">Home </a>
                        </li>
                    </router-link>
                    <li class="nav-item">
                        <a class="nav-link fw-bold " href="#">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="#">Job</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="#">Download</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="#">Station</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="#">Contact</a>
                    </li>
                </ul>
            </div>

            <div class="navbar-right d-flex align-items-center">
                <router-link to="/login"> <a class="nav-link text-black fw-bold btn " href="#">Login
                        <i class="fa-solid fa-user ms-1"></i></a></router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.custom-navbar {
    background: rgb(252, 252, 252);
    backdrop-filter: blur(10px);
    padding: 2rem 2rem;
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    transition: transform 0.3s ease;
    /* Add transition for smooth effect */
}

.navbar-brand:hover {
    transform: scale(1.2);
    /* Enlarge the brand when hovered */
}

.navbar-nav .nav-link {
    margin-right: 15px;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    /* Add transition for smooth effect */
}

.navbar-nav .nav-link:hover {
    transform: scale(1.5);
    /* Enlarge the font size when hovered */
}

.navbar-right .nav-link {
    margin-left: 15px;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    /* Add transition for smooth effect */
}

.navbar-right .nav-link:hover {
    transform: scale(1.2);
    /* Enlarge the font size when hovered */
}

.navbar-right .btn-danger {
    padding: 0.5rem 1rem;
}
</style>
