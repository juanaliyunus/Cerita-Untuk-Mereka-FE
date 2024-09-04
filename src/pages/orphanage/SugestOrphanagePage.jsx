import SideBar from '../../component/SideBar';
import { Card, CardBody, CardHeader, Input, Button, Textarea } from '@nextui-org/react';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

function SuggestOrphanagePage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-teal-100">
      <SideBar />
      <div className="flex-grow p-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <Card className="shadow-lg border rounded-lg bg-white">
            <CardHeader className="bg-blue-500 py-4 rounded-t-lg text-white">
              <h1 className="text-2xl font-semibold text-center">Suggest an Orphanage</h1>
            </CardHeader>
            <CardBody className="p-6 space-y-6">
              <p className="text-gray-700 text-center">
                Help us extend our reach by suggesting an orphanage you know of.
              </p>
              <Input
                placeholder="Enter the name of the orphanage"
                startContent={<Home className="text-gray-600" />}
                className="border rounded-md shadow-sm"
              />
              <Input
                placeholder="Enter contact email"
                type="email"
                startContent={<Mail className="text-gray-600" />}
                className="border rounded-md shadow-sm"
              />
              <Input
                placeholder="Enter phone number"
                type="tel"
                startContent={<Phone className="text-gray-600" />}
                className="border rounded-md shadow-sm"
              />
              <Textarea
                placeholder="Enter full address"
                startContent={<MapPin className="text-gray-600 mt-1" />}
                className="border rounded-md shadow-sm"
                minRows={4}
              />
              <div className="flex justify-center mt-6">
                <Button
                  color="primary"
                  size="lg"
                  className="w-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Submit Suggestion
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SuggestOrphanagePage;
