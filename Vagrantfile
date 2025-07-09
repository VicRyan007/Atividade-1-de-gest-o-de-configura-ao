Vagrant.configure("2") do |config|
  # VM1
  config.vm.define "vm1" do |vm1|
    vm1.vm.box = "ubuntu/bionic64"
    vm1.vm.hostname = "vm1"
    vm1.vm.network "private_network", ip: "192.168.56.10"
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
    end
    vm1.vm.boot_timeout = 600
  end

  # VM2
  config.vm.define "vm2" do |vm2|
    vm2.vm.box = "ubuntu/bionic64"
    vm2.vm.hostname = "vm2"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = 1024 # Reduzido para evitar sobrecarga
    end
    vm2.vm.boot_timeout = 600
    # Sincronizar pasta do projeto
    vm2.vm.synced_folder ".", "/vagrant_data"
    # Provisionamento para instalar dependências e rodar app
    vm2.vm.provision "shell", inline: <<-SHELL
      curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
      cd /vagrant_data
      npm install
      nohup node app.js &
    SHELL
  end
end 