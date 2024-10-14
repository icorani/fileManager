# Command Line File Manager
- 
- General
    - Application accepts username and prints proper message
    - Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
    - Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
    - Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
    - Go upper from current directory
    - Go to dedicated folder from current directory
    - List all files and folders in current directory
- Basic operations with files implemented properly
    - Read file and print it's content in console
    - Create empty file
    - Rename file
    - Copy file
    - Move file
    - Delete file
- Operating system info (prints following information in console) implemented properly
    - Get EOL (default system End-Of-Line)
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
    - Get home directory
    - Get current *system user name* (Do not confuse with the username that is set when the application starts)
    - Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
    - Calculate hash for file 
- Compress and decompress operations
    - Compress file (using Brotli algorithm)
    - Decompress file (using Brotli algorithm)

## Need to check

-  All operations marked as to be implemented using certain streams should be performed using Streams API
-  No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)  
-  Codebase is written in ESM modules instead of CommonJS
-  Codebase is separated (at least 7 modules)
