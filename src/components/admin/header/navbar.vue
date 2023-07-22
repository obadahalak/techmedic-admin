<template>
    
    <div>
        <nav class="flex  overflow-x-auto lg:justify-around md:justify-around sm:justify-around list-none p-4 border-b-2 border-gray-700 bg-slate-100">
            <router-link :to="{ name: 'company' }">
                <li class="  p-2 cursor-pointer hover:text-bold hover:text-lg hover:shadow-sm">
                    <span>company</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'category' }">

                <li class="mx-2 p-2 cursor-pointer hover:font-bold hover:text-lg hover:shadow-sm">
                    <span>cattegory</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'certificate' }">

                <li class="mx-2 p-2 cursor-pointer hover:font-bold hover:text-lg hover:shadow-sm">
                    <span>certificate</span>
                </li>
            </router-link>

            <router-link :to="{ name: 'product' }">

                <li class="mx-2 p-2 cursor-pointer hover:font-bold hover:text-lg hover:shadow-sm">
                    <span>product</span>
                </li>
            </router-link>

            <router-link :to="{ name: 'banner' }">

                <li class="mx-2 p-2 cursor-pointer hover:font-bold hover:text-lg hover:shadow-sm">
                    <span>banner</span>
                </li>
            </router-link>

            <router-link :to="{ name: 'profile' }">

                <li class=" text-white  bg-gray-700 rounded-md p-2 cursor-pointer hover:font-bold hover:text-lg hover:shadow-sm">
                    <span>profile</span>
                </li>
            </router-link>
        </nav>
    </div>
</template>