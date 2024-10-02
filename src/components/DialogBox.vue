<template>
    <div>
        <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Confirmation</h3>
                <p class="text-gray-700">Are you sure you want to delete this item?</p>
                <div class="flex justify-center mt-6 space-x-4">
                    <button class="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 transition"
                        @click="$emit('confirm')">Yes</button>
                    <button class="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition"
                        @click="$emit('cancel')">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DialogBox'
};
</script>