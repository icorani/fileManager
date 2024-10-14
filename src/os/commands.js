import os from 'os';

export const getUsernameFromOs = () => {
    console.log(`Username: ${os.userInfo().username}`)
}

export const getEOL = () => {
    console.log(`Default system End-Of-Line (EOL) is: ${JSON.stringify(os.EOL)}`);
};

export const getArch = () => {
  console.log(`CPU architecture: ${os.arch()}`);
};
export const getHomeDir = () => {
    console.log(`Home directory of current user: ${os.homedir()}`);
};

export const getCpuInfo = () => {
    const cpus = os.cpus();
    console.log(`Total number of CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        const cpuModel = cpu.model;
        const cpuSpeed = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}:\tModel: ${cpuModel}`);
        console.log(`\tClock Rate: ${cpuSpeed} GHz`);
    });
};